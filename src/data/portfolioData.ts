import type { ProjectItem, ExperienceItem, SkillCategory } from '../types';
import resnorImage from '../assets/resnor.png';
import adaptiveOverviewImage from '../assets/adaptive-overview.png';
import analyticalOverviewImage from '../assets/Screenshot 2026-08-24 201327.png';
import analyticalShot01 from '../assets/Screenshot 2026-08-24 201340.png';
import analyticalShot02 from '../assets/Screenshot 2026-08-24 201352.png';
import behavioralOverviewImage from '../assets/behavioral/overview.png';
import behavioralShot01 from '../assets/behavioral/shot-01.png';
import behavioralShot02 from '../assets/behavioral/shot-02.png';
import knnShot01 from '../assets/knn/Screenshot 2026-08-24 203553.png';
import knnShot02 from '../assets/knn/Screenshot 2026-08-24 205106.png';
import knnShot03 from '../assets/knn/Screenshot 2026-08-24 205139.png';
import knnShot04 from '../assets/knn/Screenshot 2026-08-24 205206.png';
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
    id: 'knn-wellbeing-support',
    title: 'K.N.N Based Welbeing Support',
    description: 'An AI-assisted wellbeing monitoring system that combines mood tracking, behavioral telemetry, and K-Nearest Neighbors (KNN) to detect personalized stress and burnout patterns.',
    fullDescription: 'An AI-assisted wellbeing monitoring system that combines mood tracking, behavioral telemetry, and K-Nearest Neighbors (KNN) to detect personalized stress and burnout patterns. Features mood and journal tracking, behavioral fingerprinting, personalized KNN prediction, dynamic risk detection without rigid thresholds, and proactive support integrations.',
    views: 980,
    stars: 295,
    forks: 58,
    categories: ['Data & Behavioral Engine', 'AI / ML'],
    status: 'Completed',
    tags: ['#KNN', '#WellbeingMonitoring', '#BehavioralTelemetry', '#StressDetection', '#Next.js', '#TypeScript'],
    imageUrl: knnShot01,
    githubUrl: 'https://github.com/eusha/knn-wellbeing-support',
    demoUrl: 'https://proffessorl-rafidai.vercel.app/',
    overview: {
      headline: 'K.N.N Based Wellbeing Support — Personalized Stress & Burnout Detection',
      intro: [
        'An AI-assisted wellbeing monitoring system that combines mood tracking, behavioral telemetry, and K-Nearest Neighbors (KNN) to detect personalized stress and burnout patterns.',
        'Avoids rigid universal thresholds and adapts predictions to the student\'s individual behavioral baseline.'
      ],
      differentiatorsTitle: 'Core Platform Features & Capabilities',
      differentiators: [
        {
          title: '📝 Mood & Journal Tracking',
          description: 'Captures daily mood, emotional patterns, and journal entries to build longitudinal wellbeing trends.',
        },
        {
          title: '🔍 Behavioral Fingerprinting',
          description: 'Builds a daily profile from study hours, mood, low-mood frequency, late-night activity, and quiz performance trends.',
        },
        {
          title: '🤖 Personalized KNN Prediction',
          description: 'Compares the student\'s current behavioral fingerprint against their own historical patterns to identify similarities with previously recorded high-stress or burnout states.',
        },
        {
          title: '⚡ Dynamic Risk Detection',
          description: 'Avoids rigid universal thresholds and adapts predictions to the student\'s individual behavioral baseline.',
        },
        {
          title: '🛡️ Proactive Support',
          description: 'Combines risk insights with focus sessions, wellbeing dashboards, and quick-access support mechanisms.',
        },
      ],
      reliabilityTitle: 'Core End-to-End Architecture Flow',
      reliability: [
        'Today\'s Behavior + Mood + Journal',
        'Behavioral Fingerprint Extraction (Hours, Mood, LowMood, Late, QuizTrend)',
        'Historical Check-in Comparison via KNN Algorithm',
        'Personalized Risk Prediction (Low / Moderate / High Stress)',
        'Proactive Support & Intervention Trigger',
      ],
      oneLiner: 'Combining mood tracking, behavioral telemetry, and K-Nearest Neighbors (KNN) to detect personalized stress and burnout patterns.',
    },
    architectureLoop: ['Today\'s Behavior', 'Behavioral Fingerprint', 'KNN Algorithm', 'Historical Check-ins', 'Risk Prediction', 'Proactive Support'],
    architectureDiagram: `TODAY'S BEHAVIOR
             │
             ▼
   ┌───────────────────┐
   │ BEHAVIORAL        │
   │ FINGERPRINT       │
   │                   │
   │ [Hours, Mood,     │
   │  LowMood, Late,   │
   │  QuizTrend]       │
   └─────────┬─────────┘
             │
             ▼
        ┌─────────┐
        │   KNN   │◄──────── Historical Check-ins
        └────┬────┘
             │
             ▼
   ┌───────────────────┐
   │ PERSONALIZED      │
   │ RISK PREDICTION   │
   │                   │
   │ Low / Moderate /  │
   │ High Stress       │
   └─────────┬─────────┘
             │
             ▼
      PROACTIVE SUPPORT`,
    outputImages: [
      { src: knnShot01 },
      { src: knnShot02 },
      { src: knnShot03 },
      { src: knnShot04 },
    ],
  },
  {
    id: 'diagnostic-analysis-mistake',
    title: 'Diagnostic Analysis',
    description: 'An AI-powered mistake analysis engine that transforms incorrect quiz answers into personalized learning interventions by identifying the root cause of a student\'s misconception.',
    fullDescription: 'Diagnostic Analysis (Explain My Mistake — AI Diagnostic Learning System) is an advanced AI-powered mistake analysis engine that transforms incorrect quiz answers into personalized learning interventions by identifying the root cause of a student\'s misconception. It features AI error diagnosis, personalized correction, adaptive remediation, misconception tracking, and a reliable AI pipeline with validation, sanitization, error recovery, and database caching.',
    views: 1120,
    stars: 310,
    forks: 65,
    categories: ['AI / ML', 'RAG'],
    status: 'Completed',
    tags: ['#AIErrorDiagnosis', '#AdaptiveRemediation', '#MisconceptionTracking', '#StructuredLLM', '#Next.js', '#TypeScript'],
    imageUrl: analyticalOverviewImage,
    githubUrl: 'https://github.com/eusha/diagnostic-analysis',
    demoUrl: 'https://proffessorl-rafidai.vercel.app/',
    overview: {
      headline: 'Explain My Mistake — AI Diagnostic Learning System',
      intro: [
        'An AI-powered mistake analysis engine that transforms incorrect quiz answers into personalized learning interventions by identifying the root cause of a student\'s misconception.',
        'Uses structured LLM outputs with validation, sanitization, error recovery, and database caching to reduce redundant AI calls and ensure consistent responses.'
      ],
      differentiatorsTitle: 'Core Platform Features & Capabilities',
      differentiators: [
        {
          title: '🔍 AI Error Diagnosis',
          description: 'Analyzes the question, correct answer, and student\'s response to identify conceptual misunderstandings, reasoning errors, or careless mistakes.',
        },
        {
          title: '💡 Personalized Correction',
          description: 'Generates targeted explanations, quick fixes, analogies, step-by-step corrections, and prevention strategies.',
        },
        {
          title: '🔄 Adaptive Remediation',
          description: 'Automatically creates follow-up practice questions to verify whether the misconception has been resolved.',
        },
        {
          title: '📈 Misconception Tracking',
          description: 'Tracks recurring errors and knowledge gaps over time to build a personalized learning profile.',
        },
        {
          title: '⚡ Reliable AI Pipeline',
          description: 'Uses structured LLM outputs with validation, sanitization, error recovery, and database caching to reduce redundant AI calls and ensure consistent responses.',
        },
      ],
      reliabilityTitle: 'Core End-to-End Architecture Flow',
      reliability: [
        'Wrong Answer Submitted',
        'AI Error Diagnosis & Root Cause Analysis',
        'Personalized Explanation & Correction Generation',
        'Targeted Practice Question Creation',
        'Learning Verification & Misconception Tracking',
      ],
      oneLiner: 'Transforming incorrect quiz answers into personalized learning interventions by identifying the root cause of student misconceptions.',
    },
    architectureLoop: ['Wrong Answer', 'Error Diagnosis', 'Root Cause', 'Personalized Explanation', 'Targeted Practice', 'Learning Verification'],
    architectureDiagram: `DIAGNOSTIC ANALYSIS LEARNING SYSTEM
                         │
                         ▼
            ┌────────────────────────┐
            │     WRONG ANSWER       │
            │                        │
            │ • Question Context     │
            │ • Correct Answer       │
            │ • Student Response     │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │     AI DIAGNOSIS       │
            │                        │
            │ • Error Analysis       │
            │ • Conceptual Gap       │
            │ • Root Cause ID        │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ PERSONALIZED CORRECTION│
            │                        │
            │ • Target Explanation   │
            │ • Quick Fix / Analogy  │
            │ • Step-by-Step Fix     │
            │ • Prevention Strategy  │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  ADAPTIVE REMEDIATION  │
            │                        │
            │ • Follow-up Practice   │
            │ • Verification Qs      │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ MISCONCEPTION TRACKING │
            │                        │
            │ • Recurring Errors     │
            │ • Knowledge Gaps       │
            │ • Learning Profile     │
            └────────────────────────┘`,
    outputImages: [
      { src: analyticalOverviewImage },
      { src: analyticalShot01 },
      { src: analyticalShot02 },
    ],
  },
  {
    id: 'behavioral-analytics-burnout',
    title: 'Behavioral Analytics & Burnout Prevention',
    description: 'An AI-powered student analytics platform that transforms behavioral telemetry and academic data into predictive insights, burnout-risk detection, and proactive AI coaching.',
    fullDescription: 'Behavioral Analytics & Burnout Prevention is an advanced student intelligence platform designed to continuously track behavioral telemetry (study time, task completion, engagement patterns, interaction behavior) and process signals through a robust burnout and wellbeing engine. It combines engagement and academic data to identify performance trends, forecast potential academic issues, and deploy specialized AI agents for personalized coaching and proactive interventions.',
    views: 950,
    stars: 280,
    forks: 54,
    categories: ['Data & Behavioral Engine', 'AI / ML'],
    status: 'Completed',
    tags: ['#Telemetry', '#BurnoutDetection', '#PredictiveAnalytics', '#AICoaching', '#Next.js', '#TypeScript'],
    imageUrl: behavioralOverviewImage,
    githubUrl: 'https://github.com/eusha/behavioral-analytics-burnout',
    demoUrl: 'https://proffessorl-rafidai.vercel.app/',
    overview: {
      headline: 'Behavioral Analytics, Burnout Risk Detection & Proactive AI Coaching',
      intro: [
        'An AI-powered student analytics platform that transforms behavioral telemetry and academic data into predictive insights, burnout-risk detection, and proactive AI coaching.',
        'Maintains a unified Digital Student Model combining academic performance, study behavior, tasks, journals, and engagement history into an actionable closed-loop workflow.'
      ],
      differentiatorsTitle: 'Core Platform Modules & Capabilities',
      differentiators: [
        {
          title: '📊 Behavioral Telemetry',
          description: 'Tracks study time, screen/active time, task completion, interaction behavior, and study frequency in real time.',
        },
        {
          title: '🔥 Burnout & Wellbeing Engine',
          description: 'Processes behavioral signals to estimate fatigue detection, stress indicators, workload analysis, and dynamic burnout risk scores (Low → Moderate → High).',
        },
        {
          title: '🔮 Predictive Analytics',
          description: 'Combines engagement and academic history to identify performance trends, consistency metrics, behavior anomalies, and forecast potential academic issues.',
        },
        {
          title: '🤖 Proactive AI Coaching Layer',
          description: 'Turns analytics into smart notifications, break recommendations, workload adjustments, schedule optimization, and early warnings.',
        },
        {
          title: '🔄 Closed Feedback Loop',
          description: 'Student actions feed directly back into telemetry, continuously updating the Digital Student Model for adaptive intervention.',
        },
      ],
      reliabilityTitle: 'Core End-to-End Architecture Flow',
      reliability: [
        'Student Activity → Behavioral Telemetry (Event Collection, Session Tracking, Timing Analysis)',
        'Data Processing (Aggregation, Normalization, Trend Calculation, Historical Analysis)',
        'Behavioral Analytics Engine (Engagement Score, Productivity Trends, Behavior Anomalies)',
        'Burnout & Risk Classification (Fatigue Detection, Stress Indicators, Low → Moderate → High)',
        'Intervention Engine & Proactive AI Coaching → Student Action → Feedback Loop',
      ],
      oneLiner: 'Transforming raw behavioral telemetry into predictive insights, early burnout detection, and proactive AI coaching through a continuous closed-loop feedback system.',
    },
    architectureLoop: ['Student Activity', 'Telemetry', 'Data Processing', 'Behavioral Analytics', 'Burnout Engine', 'Risk Classification', 'Intervention Engine', 'Student Action', 'Feedback Loop'],
    architectureDiagram: `BEHAVIORAL ANALYTICS & BURNOUT PREVENTION SYSTEM
                         │
                         ▼
            ┌────────────────────────┐
            │   STUDENT ACTIVITIES   │
            │                        │
            │ • Study Sessions       │
            │ • Screen/Active Time   │
            │ • Task Completion      │
            │ • Interaction Events   │
            │ • Study Frequency      │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   TELEMETRY ENGINE     │
            │                        │
            │ Event Collection       │
            │ Session Tracking       │
            │ Timing Analysis        │
            │ Engagement Metrics     │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   DATA PROCESSING      │
            │                        │
            │ • Aggregation          │
            │ • Normalization        │
            │ • Trend Calculation    │
            │ • Historical Analysis  │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ BEHAVIORAL ANALYTICS   │
            │       ENGINE           │
            │                        │
            │ • Engagement Score     │
            │ • Productivity Trends  │
            │ • Consistency          │
            │ • Behavior Anomalies   │
            │ • Activity Patterns    │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   BURNOUT ENGINE       │
            │                        │
            │ • Fatigue Detection    │
            │ • Stress Indicators    │
            │ • Workload Analysis    │
            │ • Burnout Risk Score   │
            │ • Wellbeing Trends     │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   RISK CLASSIFICATION  │
            │                        │
            │   LOW → MODERATE →     │
            │          HIGH          │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  INTERVENTION ENGINE   │
            │                        │
            │ • Smart Notifications  │
            │ • Break Recommendations│
            │ • Workload Adjustment  │
            │ • Schedule Optimization│
            │ • Early Warnings       │
            └────────────┬───────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │   STUDENT   │
                  │             │
                  │ Takes Action│
                  └──────┬──────┘
                         │
                         │ New Activity
                         ▼
                  ───────────────
                  FEEDBACK LOOP
                  ───────────────
                         │
                         └──────────────► TELEMETRY`,
    outputImages: [
      { src: behavioralOverviewImage },
      { src: behavioralShot01 },
      { src: behavioralShot02 },
    ],
  },
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
