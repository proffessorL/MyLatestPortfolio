import type { ProjectItem, ExperienceItem, SkillCategory } from '../types';
import resnorImage from '../assets/resnor.png';
import adaptiveOverviewImage from '../assets/adaptive-overview.png';
import adaptiveShot01 from '../assets/adaptive-shot-01.png';
import adaptiveShot02 from '../assets/adaptive-shot-02.png';
import adaptiveShot03 from '../assets/adaptive-shot-03.png';
import adaptiveShot04 from '../assets/adaptive-shot-04.png';
import adaptiveShot05 from '../assets/adaptive-shot-05.png';
import adaptiveShot06 from '../assets/adaptive-shot-06.png';
import adaptiveShot07 from '../assets/adaptive-shot-07.png';
import adaptiveShot08 from '../assets/adaptive-shot-08.png';
import resnorShot01 from '../assets/resnor-shot-01.png';
import resnorShot02 from '../assets/resnor-shot-02.png';
import resnorShot03 from '../assets/resnor-shot-03.png';
import resnorShot04 from '../assets/resnor-shot-04.png';
import resnorShot05 from '../assets/resnor-shot-05.png';
import resnorShot06 from '../assets/resnor-shot-06.png';
import resnorShot07 from '../assets/resnor-shot-07.png';
import resnorShot08 from '../assets/resnor-shot-08.png';
import resnorShot09 from '../assets/resnor-shot-09.png';
import resnorShot10 from '../assets/resnor-shot-10.png';
import resnorShot11 from '../assets/resnor-shot-11.png';

export const projectsData: ProjectItem[] = [
  {
    id: 'adaptive-learning-intelligent',
    title: 'Adaptive Learning Intelligent',
    description: 'An advanced RAG-powered adaptive learning intelligence platform that dynamically customizes curriculum delivery and real-time concept reinforcement.',
    fullDescription: 'Adaptive Learning Intelligent is a state-of-the-art educational platform leveraging Retrieval-Augmented Generation (RAG) and multi-agent AI to assess student comprehension levels in real time, dynamically generating tailored study pathways and contextual knowledge bases.',
    views: 840,
    stars: 215,
    forks: 42,
    categories: ['RAG', 'AI / ML'],
    status: 'Completed',
    tags: ['#RAG', '#LangChain', '#VectorDB', '#Next.js', '#TypeScript', '#AI'],
    imageUrl: adaptiveOverviewImage,
    githubUrl: 'https://github.com/eusha/adaptive-learning-intelligent',
    demoUrl: 'https://proffessorl-rafidai.vercel.app/',
    overview: {
      headline: 'RAG-Powered Personalized Learning & Intelligent Tutoring',
      intro: [
        'An advanced agentic AI tutoring system that generates personalized responses by combining LLMs with a course-aware RAG pipeline.',
        'Designed to adapt directly to study plans, weak topics, quiz mistakes, notes, and individual learning behavior for hyper-targeted student growth.',
      ],
      differentiatorsTitle: 'Key Architectural & RAG Features',
      differentiators: [
        {
          title: '📚 RAG Pipeline & Vector Database',
          description: 'Course materials undergo semantic chunking and 384D embeddings stored in PostgreSQL + pgvector, enabling ultra-fast cosine-similarity retrieval.',
        },
        {
          title: '🎯 Grounded AI Responses',
          description: 'Retrieves the most relevant course content from the vector database and injects it into the LLM context before generating precise answers.',
        },
        {
          title: '🧩 Personalized Tutoring Engine',
          description: 'Leverages study plans, weak topics, quiz mistakes, notes, and continuous learning behavior to adapt explanations and guidance.',
        },
        {
          title: '🤖 Multi-Model Ensemble (7 Specialized LLMs)',
          description: 'Integrates 7 distinct AI models working collaboratively, featuring a multi-tiered architecture where each primary tutor delegates across 3 specialized sub-models to synthesize the most accurate, reliable, and nuanced response.',
        },
        {
          title: '⚡ Hybrid AI Architecture',
          description: 'Supports Groq, Ollama, OpenRouter & HuggingFace with robust fallback mechanisms for highly resilient operation.',
        },
      ],
      reliabilityTitle: 'Core End-to-End Flow',
      reliability: [
        'Course Content → RAG Database (PostgreSQL + pgvector)',
        'Semantic Retrieval & Cosine Similarity',
        'Context Injection & Grounded Synthesis',
        'Multi-Agent LLM Processing (Groq, Ollama, OpenRouter, HuggingFace)',
        'Personalized Tutor Response & Continuous Adaptation',
      ],
      oneLiner: 'Bringing true adaptive intelligence to education through course-aware RAG pipelines, multi-agent personas, and hybrid resilient LLM architecture.',
    },
    architectureLoop: ['Course Content', 'RAG Database', 'Semantic Retrieval', 'Context Injection', 'LLM Synthesis', 'Personalized Response'],
    architectureDiagram: `╔════════════════════════════════════════════╗
║             📚 COURSE MATERIAL             ║
╚═════════════════════╦══════════════════════╝
                      ║
                      ▼
            ┌───────────────────┐
            │   ✂️  CHUNKING    │
            └─────────┬─────────┘
                      ║
                      ▼
            ┌───────────────────┐
            │   🧬  EMBEDDING   │
            └─────────┬─────────┘
                      ║
                      ▼
      ╔═══════════════════════════════╗
      │  PostgreSQL ＋ pgvector       │
      │  ⚡ [ VECTOR DATABASE ]       │
      ╚═══════════════╦═══════════════╝
                      ║
                      ║ 🔍 Semantic Search & Top-K
                      ▼
      ╔═══════════════════════════════╗
      │      🎯 RELEVANT CONTEXT      │
      ╚═══════════════╦═══════════════╝
                      ║
                      ╠════════════════► 👤 Student Context
                      ║                  📋 Study Plan
                      ║                  ⚠️ Weak Topics
                      ║                  ❌ Quiz Mistakes
                      ▼
      ╔═══════════════════════════════╗
      │      ⚡ CONTEXT ASSEMBLY      │
      ╚═══════════════╦═══════════════╝
                      ║
                      ▼
      ╔═══════════════════════════════╗
      │          🤖 LLM ENGINE        │
      │  Groq / OpenRouter / Ollama   │
      ╚═══════════════╦═══════════════╝
                      ║
                      ▼
╔════════════════════════════════════════════╗
│    ✨ GROUNDED PERSONALIZED AI RESPONSE    │
╚════════════════════════════════════════════╝`,
    outputImages: [
      { src: adaptiveShot01 },
      { src: adaptiveShot02 },
      { src: adaptiveShot03 },
      { src: adaptiveShot04 },
      { src: adaptiveShot05 },
      { src: adaptiveShot06 },
      { src: adaptiveShot07 },
      { src: adaptiveShot08 },
    ],
  },
  {
    id: 'resnor',
    title: 'RESNOR',
    description: 'An AI-powered resource normalization engine and companion suite designed for automated workflow scheduling and API payload sanitization.',
    fullDescription: 'RESNOR is an enterprise-grade AI data pipeline that accepts unstructured REST, GraphQL, or webhook events and automatically normalizes schemas, removes redundant fields, and queues jobs in Redis for async worker execution.',
    views: 1205,
    stars: 342,
    forks: 89,
    categories: ['AI / ML', 'Web Development'],
    status: 'Completed',
    tags: ['#Next.js', '#React', '#Supabase', '#Prisma', '#TypeScript', '#RAG'],
    imageUrl: resnorImage,
    githubUrl: 'https://github.com/eusha/resnor-ai',
    demoUrl: 'https://proffessorl-rafidai.vercel.app/',
    overview: {
      headline: 'RESNOR — AI Learning Companion',
      intro: [
        'RESNOR is an AI-powered EdTech platform designed to work like a personal academic coach — not just an AI chatbot.',
        'It combines academic performance, learning behavior, engagement, and wellbeing to understand why a student is struggling and decide what to do next.',
      ],
      differentiatorsTitle: 'What makes RESNOR different?',
      differentiators: [
        {
          title: '🧠 More than an AI Tutor',
          description: 'RAG + multi-agent AI provides grounded, specialized, and context-aware tutoring instead of simple chatbot responses.',
        },
        {
          title: '📊 Behavioral Intelligence',
          description: 'RESNOR continuously analyzes real learning behavior through telemetry — not just exam scores.',
        },
        {
          title: '🔮 Predictive, Not Reactive',
          description: "A self-supervised burnout prediction engine identifies risk from the student's own behavioral patterns, without requiring a huge labeled dataset.",
        },
        {
          title: '🔔 Adaptive Notifications',
          description: 'Instead of sending generic reminders, RESNOR learns when each student is most receptive and adapts notification timing based on their responses.',
        },
        {
          title: '🔄 The Closed Feedback Loop — The Core Differentiator',
          flowSteps: [
            'Student Activity',
            'Behavior Analysis',
            'Prediction',
            'Personalized Action',
            'Student Response',
            'Learning from Response',
          ],
          flowNote: "This is what makes the system powerful: RESNOR doesn't just personalize once — it continuously learns from the student and adapts.",
        },
      ],
      reliabilityTitle: 'Why it is more reliable',
      reliability: [
        'RAG → grounded AI responses',
        'Multi-agent verification → multiple specialized reasoning steps',
        'Provider failover → AI service remains resilient',
        "Self-supervised ML → doesn't depend entirely on labeled datasets",
        "Behavior + academic data → decisions aren't based on a single metric",
        'Feedback loop → recommendations improve through real user behavior',
      ],
      oneLiner: "RESNOR turns an AI tutor into an adaptive academic intelligence system — one that doesn't just answer students, but observes, predicts, intervenes, and learns.",
    },
    architectureLoop: ['Telemetry', 'Analyze', 'Predict', 'Notify', 'User Response', 'Telemetry'],
    architectureDiagram: `                  AI Learning Companion
                            │
       ┌────────────────────┼────────────────────┐
       ↓                    ↓                    ↓
   EXPERIENCE            AI ENGINE          INTELLIGENCE
       │                    │                    │
  Next.js 16             AI Tutor            Burnout
  React 19               RAG                 Prediction
  Zustand                Multi-Agent         k-NN
  Telemetry              pgvector            Behavioral Data
       │                    │                    │
       └────────────────────┼────────────────────┘
                            ↓
                       DATA LAYER
                            │
                 PostgreSQL + Prisma
                      Supabase
                            │
                            ↓
                  ADAPTIVE FEEDBACK
                            │
              ┌─────────────┴─────────────┐
              ↓                           ↓
        Smart Timing              Personalized
        Notifications                 Nudges
              │                           │
              └─────────────┬─────────────┘
                            ↓
                       USER RESPONSE
                            │
                            └──────→ Telemetry ↺`,
    outputImages: [
      { src: resnorShot01 },
      { src: resnorShot02 },
      { src: resnorShot03 },
      { src: resnorShot04 },
      { src: resnorShot05 },
      { src: resnorShot06 },
      { src: resnorShot07 },
      { src: resnorShot08 },
      { src: resnorShot09 },
      { src: resnorShot10 },
      { src: resnorShot11 },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Founder & Full Stack Developer',
    company: 'RESNOR',
    period: '2025 - Present',
    isCurrent: true,
    commits: [
      'Founded RESNOR and handle the whole platform end to end — frontend, backend, database, and API development.',
      'Develop and integrate AI/LLM features into the product, from chatbots to smart automation tools.',
      'Own the full product cycle — building new features, maintaining core systems, and shipping improvements.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Frontend & Backend Developer',
    company: 'Pixses',
    period: '2025 - 2026',
    isCurrent: false,
    commits: [
      'Built responsive UI components and pages with React based on the design team\'s mockups.',
      'Helped develop and maintain simple backend APIs, and fixed bugs reported by users.',
      'Worked under senior developers guidance, joined code reviews, and shipped small features every sprint.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Freelance Full-Stack Developer',
    company: 'Upwork',
    period: '2026 - Present',
    isCurrent: true,
    commits: [
      'Work with global clients on full-stack projects — React frontends, Node.js APIs, and database design.',
      'Deliver complete web applications from requirements to deployment, with clear milestones and regular updates.',
      'Integrate AI features into client products, including chatbots and smart content tools.',
    ],
  },
  {
    id: 'exp-4',
    role: 'Freelance Web & AI Developer',
    company: 'Fiverr',
    period: '2026 - Present',
    isCurrent: true,
    commits: [
      'Handle orders covering web development, bug fixes, and website improvements with fast turnaround.',
      'Build custom AI-powered tools for buyers — chatbots, quiz generators, and AI tutoring apps.',
      'Keep buyers coming back through clear communication, reliable delivery, and proper support.',
    ],
  },
];

export const skillsCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'web',
    skills: [
      { name: 'React', percentage: 92, icon: 'javascript' },
      { name: 'Next.js', percentage: 90, icon: 'bolt' },
      { name: 'Tailwind CSS', percentage: 95, icon: 'css' },
      { name: 'TypeScript', percentage: 88, icon: 'data_object' },
      { name: 'HTML5 / Modern CSS', percentage: 95, icon: 'code' },
    ],
  },
  {
    title: 'Backend',
    icon: 'dns',
    skills: [
      { name: 'Node.js', percentage: 88, icon: 'integration_instructions' },
      { name: 'Express.js', percentage: 85, icon: 'route' },
      { name: 'Python', percentage: 78, icon: 'terminal' },
    ],
  },
  {
    title: 'Database',
    icon: 'storage',
    skills: [
      { name: 'PostgreSQL', percentage: 85, icon: 'database' },
      { name: 'Supabase', percentage: 84, icon: 'cloud' },
      { name: 'MongoDB / Redis', percentage: 80, icon: 'storage' },
      { name: 'Prisma ORM', percentage: 83, icon: 'api' },
    ],
  },
  {
    title: 'Tools / Infrastructure',
    icon: 'build',
    skills: [
      { name: 'Git & GitHub Workflows', percentage: 88, icon: 'account_tree' },
      { name: 'Docker & Containers', percentage: 62, icon: 'view_in_ar' },
      { name: 'AWS & Cloud Deployment', percentage: 55, icon: 'cloud' },
      { name: 'VS Code Architecture', percentage: 90, icon: 'code' },
    ],
  },
  {
    title: 'RAG & Vector AI',
    icon: 'hub',
    skills: [
      { name: 'RAG Pipelines & Chunking', percentage: 94, icon: 'layers' },
      { name: 'pgvector & Vector DB', percentage: 92, icon: 'database' },
      { name: 'Embeddings & Similarity Search', percentage: 91, icon: 'search' },
      { name: 'Multi-Agent AI Systems', percentage: 90, icon: 'groups' },
      { name: 'Hybrid LLM Routing (Groq/Ollama)', percentage: 93, icon: 'bolt' },
    ],
  },
  {
    title: 'AI / ML',
    icon: 'smart_toy',
    skills: [
      { name: 'Chatbots & AI Assistants', percentage: 93, icon: 'smart_toy' },
      { name: 'LLM API Integration', percentage: 92, icon: 'api' },
      { name: 'RAG Implementation', percentage: 90, icon: 'library_books' },
      { name: 'AI Quiz & Tutoring Tools', percentage: 91, icon: 'quiz' },
      { name: 'AI Text Analysis', percentage: 90, icon: 'manage_search' },
    ],
  },
];
