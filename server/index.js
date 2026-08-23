import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'eusha@example.com';

// Initialize Resend Client if API key is provided
const resend = RESEND_API_KEY && !RESEND_API_KEY.includes('your_resend_api_key')
  ? new Resend(RESEND_API_KEY)
  : null;

// CORS & JSON parsing
app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const messagesFilePath = path.join(dataDir, 'messages.json');

// Ensure data directory and messages.json exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2), 'utf-8');
}

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const lastTime = rateLimitMap.get(ip);
  const COOLDOWN_MS = 30 * 1000; // 30 second cooldown per IP

  if (lastTime && now - lastTime < COOLDOWN_MS) {
    return true;
  }
  rateLimitMap.set(ip, now);
  return false;
}

// Helper to read messages
function readMessages() {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write messages
function writeMessages(messages) {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf-8');
}

// Helper to sanitize HTML strings
function sanitizeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// GET /api/health - Server Health & Config Metrics
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'EUSHA.dev Backend Engine',
    timestamp: new Date().toISOString(),
    resendConfigured: !!resend,
    recipientEmail: RECIPIENT_EMAIL,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
  });
});

// GET /api/messages - Retrieve all Contact Form submissions (Admin endpoint)
app.get('/api/messages', (req, res) => {
  const messages = readMessages();
  res.json({
    success: true,
    total: messages.length,
    messages,
  });
});

// POST /api/contact - Submit Contact Form with Resend Dispatch & DB Backup
app.post('/api/contact', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  // 1. Security Check: Rate Limiting
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait 30 seconds before sending another message.',
    });
  }

  const { name, email, subject, message } = req.body;

  // 2. Security Check: Input Validation
  if (!name || !name.trim() || name.length > 100) {
    return res.status(400).json({ success: false, error: 'Valid name is required (max 100 chars).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  if (!message || !message.trim() || message.length > 3000) {
    return res.status(400).json({ success: false, error: 'Message content is required (max 3000 chars).' });
  }

  const cleanName = sanitizeHtml(name.trim());
  const cleanEmail = email.trim();
  const cleanSubject = sanitizeHtml((subject && subject.trim()) || 'New Website Contact Inquiry');
  const cleanMessage = sanitizeHtml(message.trim());

  const submissionId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const submittedAt = new Date().toISOString();

  // 3. Save to Local Backup File FIRST (Zero Data Loss Guarantee)
  const newSubmission = {
    id: submissionId,
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
    submittedAt,
    ipAddress: clientIp,
    emailDispatched: false,
  };

  const messages = readMessages();
  messages.unshift(newSubmission);
  writeMessages(messages);

  console.log(`\n==================================================`);
  console.log(`[CONTACT API] New Message Received!`);
  console.log(`ID: ${submissionId}`);
  console.log(`From: ${cleanName} <${cleanEmail}>`);
  console.log(`Subject: ${cleanSubject}`);
  console.log(`Time: ${submittedAt}`);
  console.log(`==================================================`);

  // 4. Dispatch Email via Resend API (If Key Configured)
  let emailSuccess = false;
  let emailNotice = '';

  if (resend) {
    try {
      const emailResponse = await resend.emails.send({
        from: 'EUSHA.dev Portfolio <noreply@mail.eusha.dev>',
        to: [RECIPIENT_EMAIL],
        replyTo: cleanEmail,
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #10141a; color: #dfe2eb; border: 1px solid #30363d; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #1c2026; padding: 20px; border-bottom: 2px solid #ff7f50;">
              <h2 style="color: #ffb59c; margin: 0; font-size: 20px;">&lt;/&gt; EUSHA.dev Contact Inquiry</h2>
              <p style="color: #8b949e; margin: 5px 0 0 0; font-size: 13px;">New message received via portfolio contact form</p>
            </div>
            
            <div style="padding: 24px;">
              <div style="background-color: #181c22; border-left: 4px solid #67df70; padding: 14px; margin-bottom: 20px; border-radius: 4px;">
                <p style="margin: 0; font-[13px];"><strong>From:</strong> ${cleanName} (&lt;<a href="mailto:${cleanEmail}" style="color: #4dd9e4;">${cleanEmail}</a>&gt;)</p>
                <p style="margin: 5px 0 0 0; font-[13px];"><strong>Subject:</strong> ${cleanSubject}</p>
                <p style="margin: 5px 0 0 0; font-[12px]; color: #8b949e;"><strong>Timestamp:</strong> ${submittedAt}</p>
              </div>

              <div style="background-color: #161b22; padding: 16px; border: 1px solid #30363d; border-radius: 6px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0; color: #ffb59c; font-size: 14px;">Message Body:</h4>
                <p style="margin: 0; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${cleanMessage}</p>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${cleanEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" style="background-color: #ff7f50; color: #5c1a00; padding: 10px 20px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 13px;">
                  Reply Direct to ${cleanName}
                </a>
              </div>
            </div>

            <div style="background-color: #1c2026; padding: 12px; text-align: center; border-top: 1px solid #30363d; font-size: 11px; color: #8b949e;">
              EUSHA.dev Portfolio API • Submission ID: ${submissionId}
            </div>
          </div>
        `,
      });

      if (emailResponse.data) {
        emailSuccess = true;
        emailNotice = `Email dispatched to ${RECIPIENT_EMAIL} via Resend API!`;
        console.log(`[RESEND API] Email successfully delivered! ID: ${emailResponse.data.id}`);

        // Update local backup record
        messages[0].emailDispatched = true;
        messages[0].resendEmailId = emailResponse.data.id;
        writeMessages(messages);
      }
    } catch (err) {
      console.error(`[RESEND API ERROR] Failed to send email:`, err.message || err);
      emailNotice = `Message saved to DB. (Resend API key pending activation)`;
    }
  } else {
    emailNotice = `Message saved to server database. Add your RESEND_API_KEY in .env to enable live email forwarding.`;
    console.log(`[RESEND API] Skipping email dispatch: RESEND_API_KEY not configured in .env yet.`);
  }

  return res.status(201).json({
    success: true,
    message: emailNotice,
    emailDispatched: emailSuccess,
    submissionId,
    timestamp: submittedAt,
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n⚡ [EUSHA.dev Backend] Express Server running on http://localhost:${PORT}`);
  console.log(`  ➜ Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  ➜ Messages API: http://localhost:${PORT}/api/messages`);
  console.log(`  ➜ Resend API: ${resend ? 'ACTIVE ✅' : 'NOT CONFIGURED (Add RESEND_API_KEY in .env)'}\n`);
});
