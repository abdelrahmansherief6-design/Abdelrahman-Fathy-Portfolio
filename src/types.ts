export interface BilingualText {
  en: string;
  ar: string;
}

export interface Metric {
  label: BilingualText;
  value: string;
}

export interface Project {
  id: string;
  title: BilingualText;
  category: BilingualText;
  problem: BilingualText;
  solution: BilingualText;
  results: BilingualText;
  metrics: Metric[];
  image: string; // URL or Base64 data URL (Primary / Thumbnail)
  videoUrl?: string; // Optional YouTube/Vimeo embed URL (Primary / Default)
  images?: string[]; // Array of additional images (URLs or Base64)
  videoUrls?: string[]; // Array of additional YouTube/Vimeo embed URLs or video links
}

export interface Achievement {
  id: string;
  title: BilingualText;
  iconName: string; // Lucide icon name
}

export interface Skill {
  id: string;
  name: string; // e.g. "Power BI"
  level: 'Expert' | 'Advanced' | 'Intermediate';
  levelAr: string; // "خبير" | "متقدم" | "متوسط"
  category: 'data' | 'bi' | 'automation' | 'quality' | 'languages';
}

export interface ServiceItem {
  id: string;
  title: BilingualText;
  points: BilingualText[];
}

export interface Service {
  id: string;
  categoryTitle: BilingualText;
  iconName: string;
  items: BilingualText[];
}

export interface EducationItem {
  id: string;
  institution: BilingualText;
  degree: BilingualText;
  location: BilingualText;
  year: string;
}

export interface CertificateItem {
  id: string;
  name: BilingualText;
  issuer: BilingualText;
  track?: BilingualText;
}

export interface WhyWorkWithMeItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  iconName: string;
}

export interface PortfolioData {
  profile: {
    name: BilingualText;
    headline: BilingualText;
    valueProposition: BilingualText;
    aboutMe: BilingualText;
    avatar: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  achievements: Achievement[];
  skills: Skill[];
  services: Service[];
  whyWorkWithMe: WhyWorkWithMeItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  projects: Project[];
}
