export interface ProjectItem {
  category: string;
  title: string;
  result: string;
  description: string;
  gradient: string;
  link?: string;
}

export interface SiteConfig {
  personal: {
    nameFirst: string;
    nameLast: string;
    fullName: string;
    role: string;
    location: string;
    heroParagraph: string;
    email: string;
    github: string;
    linkedin: string;
    resumePdfPath: string;
  };
  stats: {
    number: number;
    prefix?: string;
    suffix: string;
    label: string;
  }[];
  skills: string[];
  about: {
    headline: string;
    paragraphs: string[];
  };
  projects: ProjectItem[];
}

export const siteConfig: SiteConfig = {
  personal: {
    nameFirst: 'Manish',
    nameLast: 'Chandra Maity',
    fullName: 'Manish Chandra Maity',
    role: 'B.Tech CSE (AI) student and Flutter developer',
    location: 'Delhi NCR',
    heroParagraph:
      "I build Flutter apps that real people use every day, and I'm looking for an internship where I can keep shipping production software.",
    email: 'manishmaity39@gmail.com', // Change your contact email here
    github: 'https://github.com/manish12345p', // Change your GitHub URL here
    linkedin: 'https://linkedin.com/in/manish-chandra-maity-106a02321', // Change your LinkedIn URL here
    resumePdfPath: '/Manish-Chandra-Maity-CV.pdf', // Path to your resume PDF
  },
  stats: [
    {
      number: 1500,
      suffix: '+',
      label: 'live CRM visits handled',
    },
    {
      number: 100,
      suffix: 'K+',
      label: 'Play Store users restored',
    },
    {
      number: 60,
      suffix: '+',
      label: 'ERP defects resolved',
    },
  ],
  skills: [
    'Flutter',
    'Dart',
    'Firebase',
    'REST APIs',
    'State management',
    'Play Store releases',
    'Git',
  ],
  about: {
    headline: 'Production code, not just practice projects',
    paragraphs: [
      "I'm a B.Tech Computer Science & Engineering student focused on AI who works mainly in Flutter. Instead of building toy apps, I've spent my time solving real operational problems: creating a commercial CRM that technicians use daily in the field, recovering high-traffic legacy apps on the Play Store, and systematically stabilizing large institutional ERPs.",
      "I care about building software that loads fast, fails gracefully and is easy to maintain. My core focus is on production Flutter development with predictable state management, clean architecture, and reliable daily performance.",
    ],
  },
  projects: [
    {
      category: 'CRM',
      title: 'Field visit CRM app',
      result: '1,500+ live visits',
      description:
        'A Flutter app that logs and tracks customer visits in real time across the field team.',
      gradient: 'from-[#c8102e] to-[#7a1428]',
      link: 'https://github.com/manish12345p/dashmeshro',
    },
    {
      category: 'Play Store',
      title: 'App recovery and re-release',
      result: '100K+ users restored',
      description:
        'Fixed the issues blocking the app and brought it back on the Play Store for its existing users.',
      gradient: 'from-[#ff9933] to-[#f26a1b]',
    },
    {
      category: 'ERP',
      title: 'ERP stabilization',
      result: '60+ defects resolved',
      description:
        'Traced and fixed defects across modules so daily business operations ran without interruptions.',
      gradient: 'from-[#7a1428] to-[#4a0d1a]',
    },
  ],
};
