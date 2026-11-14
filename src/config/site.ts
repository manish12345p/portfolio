export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ProjectItem {
  category: string;
  title: string;
  result: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumePdfPath: string;
  stats: StatItem[];
  skills: string[];
  projects: ProjectItem[];
}

export const site: SiteConfig = {
  name: "Manish Chandra Maity",
  role: "B.Tech CSE (AI) student and Flutter developer",
  tagline:
    "I build Flutter apps that real people use every day, and I'm looking for an internship where I can keep shipping production software.",
  location: "Delhi NCR, India",
  email: "manishmaity39@gmail.com",
  github: "",
  linkedin: "",
  resumePdfPath: "/Manish-Chandra-Maity-CV.pdf",
  stats: [
    {
      value: 1500,
      suffix: "+",
      label: "live CRM visits handled",
    },
    {
      value: 100,
      suffix: "K+",
      label: "Play Store users restored",
    },
    {
      value: 60,
      suffix: "+",
      label: "ERP defects resolved",
    },
  ],
  skills: [
    "Flutter",
    "Dart",
    "Firebase",
    "REST APIs",
    "State management",
    "Play Store releases",
    "Git",
  ],
  projects: [
    {
      category: "CRM",
      title: "Field visit CRM app",
      result: "1,500+ live visits",
      description:
        "A Flutter app that logs and tracks customer visits in real time across the field team.",
    },
    {
      category: "Play Store",
      title: "App recovery and re-release",
      result: "100K+ users restored",
      description:
        "Fixed the issues blocking the app and brought it back on the Play Store for its existing users.",
    },
    {
      category: "ERP",
      title: "ERP stabilization",
      result: "60+ defects resolved",
      description:
        "Traced and fixed defects across modules so daily business operations ran without interruptions.",
    },
  ],
};

export default site;

