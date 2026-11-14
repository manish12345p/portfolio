export interface Project {
  id: string;
  title: string;
  category: string;
  stack: string[];
  summary: string;
  description: string[];
  metrics?: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperienceRole {
  title: string;
  period: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  period: string;
  roles: ExperienceRole[];
  contributions: {
    title: string;
    tech: string;
    details: string;
    bullets?: string[];
  }[];
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  details: string;
  teamOrRole?: string;
  docUrl?: string;
  docType?: 'certificate' | 'deck';
}

export interface Education {
  institution: string;
  affiliation?: string;
  degree: string;
  period: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    splitName: {
      first: string;
      last: string;
    };
    title: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    goal: string;
    summary: string;
    resumePdf: string;
  };
  skills: {
    languages: string[];
    flutter: string[];
    frameworks: string[];
    backendAndTesting: string[];
    tools: string[];
  };
  experience: ExperienceItem[];
  featuredProjects: Project[];
  otherProjects: Project[];
  hackathons: Hackathon[];
  education: Education[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Manish Chandra Maity',
    splitName: {
      first: 'MANISH',
      last: 'CHANDRA MAITY',
    },
    title: 'B.Tech CSE (AI) Student | Flutter Developer',
    location: 'Delhi NCR',
    email: 'manishmaity39@gmail.com',
    linkedin: 'https://linkedin.com/in/manish-chandra-maity-106a02321',
    github: 'https://github.com/manish12345p',
    goal: 'Flutter developer internship where I can keep building production software.',
    summary:
      'I build production Flutter apps with BLoC and clean architecture. Built a live client CRM with 1,500+ service visits logged, shipped screens and an admin app for a Play Store exam-prep app, restored a live Play Store app on a current Flutter version, and do manual QA on a 12-module college ERP.',
    resumePdf: '/docs/Manish-Chandra-Maity-Resume.pdf',
  },
  skills: {
    languages: ['Dart', 'Python', 'Java', 'C', 'SQL'],
    flutter: [
      'BLoC',
      'Clean Architecture',
      'SOLID',
      'Freezed / JSON serialization',
      'very_good_cli',
      'package-based structure',
    ],
    frameworks: ['FastAPI', 'aiogram', 'familiar with Next.js and React'],
    backendAndTesting: [
      'Firebase',
      'Supabase (learning)',
      'REST APIs (CRUD)',
      'manual QA and defect reporting',
    ],
    tools: [
      'Git/GitHub',
      'Vercel',
      'FileZilla',
      'prompt engineering',
      'AI-assisted development',
    ],
  },
  experience: [
    {
      id: 'stucknot',
      company: 'StuckNot',
      period: 'Dec 2024 to Present',
      roles: [
        { title: 'Flutter Developer Intern', period: 'Dec 2024 to Feb 2025' },
        { title: 'Engineer Intern', period: 'May to Jul 2025' },
        { title: 'Freelance Developer', period: '2026 to Present' },
      ],
      contributions: [
        {
          title: 'StuckNot App (Live on Google Play)',
          tech: 'Flutter, BLoC',
          details:
            'Developed core screens including search with custom delegate, profile and edit profile, transaction history, and purchased-subject orders.',
        },
        {
          title: 'StuckNot Admin App',
          tech: 'Flutter',
          details:
            'Built independently to manage 90+ sample-paper PDFs (code, subject, year, semester) with comprehensive search, delete, and lock/unlock controls.',
        },
        {
          title: 'Baani.Net Live Gurbani Kirtan App Restoration',
          tech: 'Flutter, Gradle',
          details:
            'Helped restore a live Play Store app (100K+ downloads) originally built on an older Flutter version to a current version; updated Gradle configuration and dependencies using prompt engineering.',
        },
        {
          title: 'StuckNot Website v2',
          tech: 'React.js',
          details: 'Built the UI for version 2 of StuckNot official website using AI-assisted development.',
        },
        {
          title: 'CampusMaster College ERP (QA)',
          tech: '12 modules, deployed at Maples College',
          details:
            'Performed manual QA across all 12 modules, testing functionality, user flows, validations, and alerts. Logged 60+ defects in the ERP tracker with module, error details, assignee, and severity.',
        },
        {
          title: 'StuckNot Studio — AI Carousel Generator',
          tech: 'Gemini, AI-assisted development',
          details:
            'Contributed to a tool where users input brand assets (logo, colors, fonts, images) and choose a carousel type, and Gemini generates content and visuals for branded multi-slide carousels.',
        },
      ],
    },
  ],
  featuredProjects: [
    {
      id: 'dashmesh-mechanix',
      title: 'Dashmesh Mechanix',
      category: 'Client CRM / Enterprise Mobile App',
      stack: ['Flutter', 'BLoC', 'Freezed', 'Supabase'],
      summary:
        'Production Flutter CRM for a service-business client, replacing Excel sheets with real-time customer records, visit history, service calendar, payments, EMI tracking, and estimates.',
      description: [
        'Built v1 with the StuckNot team, then rebuilt the entire app solo as v2.',
        'Used live by the client: 1,500+ service visits logged, 200+ of them in the last 2 months.',
        'Structured codebase as modular packages (Very Good CLI) adhering strictly to BLoC, Freezed/JSON serialization, clean architecture, and SOLID principles.',
        'Migrated backend from Firebase to Supabase by swapping only the data-source layer while seamlessly transferring existing records.',
        'Engineered an EMI module (installments, due dates, overdue and paid status) linked to customer and service records, ensuring synchronization across customer profiles and EMI ledgers.',
      ],
      metrics: ['1,500+ Live Service Visits Logged', '200+ Visits in Last 2 Months', '100% Clean Modular Architecture'],
      repoUrl: 'https://github.com/manish12345p/dashmeshro',
      featured: true,
    },
    {
      id: 'queuelessbharat',
      title: 'QueuelessBharat',
      category: 'Healthcare / Emergency Hospital Finder',
      stack: ['React.js', 'Next.js', 'Vercel'],
      summary:
        'Web platform developed during the Build With Bharat 4.0 hackathon that helps emergency patients locate nearby hospitals with vacant beds, view on-duty doctor status, and book ambulances without queuing.',
      description: [
        'Served as front-end engineer with backend support on the team.',
        'Live on Vercel and actively maintained.',
        'Developed team codebase for responsive, accessible emergency access under high urgency scenarios.',
      ],
      metrics: ['Build With Bharat 4.0 PPT Round', 'Live on Vercel'],
      repoUrl: 'https://github.com/codedbymuskann/QueueLess_Bharat_',
      liveUrl: 'https://queuelessbharat.vercel.app',
      featured: true,
    },
    {
      id: 'snacktrack',
      title: 'SnackTrack',
      category: 'Team Mobile App',
      stack: ['Flutter', 'Clean Architecture'],
      summary:
        'Collaborative mobile application developed within a 5–6 member engineering team at StuckNot (Mar – Jul 2025).',
      description: [
        'Built the complete authentication UI, including high-polish login and sign-up interfaces.',
        'Implemented strict form validation, error messaging, and clean architecture state separation.',
      ],
      featured: true,
    },
  ],
  otherProjects: [
    {
      id: 'todo-fastapi',
      title: 'To-do App',
      category: 'Full-Stack Mobile App',
      stack: ['Flutter', 'Python FastAPI'],
      summary: 'Mobile app backed by a self-written Python FastAPI REST API with complete CRUD operations.',
      description: ['Custom REST API built with FastAPI; clean asynchronous communication from Flutter.'],
      repoUrl: 'https://github.com/manish12345p/todolist',
    },
    {
      id: 'telegram-bot',
      title: 'Telegram Bot',
      category: 'AI / Asynchronous Service',
      stack: ['Python', 'aiogram', 'OpenAI API'],
      summary: 'Asynchronous Telegram bot that processes messages and responds intelligently using an LLM.',
      description: ['Built with aiogram and OpenAI API for fast, concurrent message routing and processing.'],
      repoUrl: 'https://github.com/manish12345p/chatbot',
    },
    {
      id: 'user-details-api',
      title: 'User Details API',
      category: 'Backend Microservice',
      stack: ['Python', 'FastAPI', 'Pydantic'],
      summary: 'RESTful API with POST, GET, PUT, and DELETE endpoints, Pydantic schemas, and explicit route versioning.',
      description: ['Demonstrates robust schema validation, error response standards, and versioned routing.'],
    },
  ],
  hackathons: [
    {
      id: 'build-with-bharat',
      title: 'Build With Bharat 4.0',
      organizer: 'National Level, CodeVerse x KCC',
      details: 'PPT round with team The Malwares (QueuelessBharat)',
      teamOrRole: 'The Malwares',
      docUrl: '/docs/BuildWithBharat-4.0-Certificate.pdf',
      docType: 'certificate',
    },
    {
      id: 'vivekananda-hackathon',
      title: 'Vivekananda Innovation Hackathon 2026',
      organizer: 'DTU and Vivekananda Institute of Values',
      details: 'Online screening round (27 Sep 2026)',
      docUrl: '/docs/Vivekananda-Hackathon-Certificate.pdf',
      docType: 'certificate',
    },
    {
      id: 'ey-techathon',
      title: 'EY Techathon 6.0',
      organizer: 'Ernst & Young',
      details: 'Frontend developer on team Bug Hunters (MedSure AI — agentic-AI concept for healthcare provider data validation)',
      teamOrRole: 'Team Bug Hunters (MedSure AI)',
      docUrl: '/docs/MedSure-AI-Presentation.pdf',
      docType: 'deck',
    },
    {
      id: 'smart-india-hackathon',
      title: 'Smart India Hackathon 2025 & 2026',
      organizer: 'Ministry of Education & AICTE',
      details: 'Participated with problem statements SIH25032 and SIH26184',
      // No file for Smart India Hackathon as per strict instructions
    },
    {
      id: 'code-farming',
      title: 'Code Farming',
      organizer: 'Voyager Coding Club, HackerRank',
      details: '24-hour code-a-thon participant (29–30 Apr 2026)',
      docUrl: '/docs/CodeFarming-Certificate.pdf',
      docType: 'certificate',
    },
  ],
  education: [
    {
      institution: 'KCC Institute of Technology & Management',
      affiliation: 'AKTU',
      degree: 'B.Tech — Computer Science & Engineering (AI)',
      period: '2024 – 2028',
    },
    {
      institution: 'Vinay Nagar Bengali Senior Secondary School',
      degree: 'Class XII',
      period: '2022 – 2023',
    },
  ],
};

