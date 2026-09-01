export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  stars?: number;
  forks?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  logo?: string;
  companyUrl?: string;
}

export interface TechCategory {
  name: string;
  icon: string;
  technologies: Tech[];
}

export interface Tech {
  name: string;
  icon: string;
  level?: 'expert' | 'advanced' | 'intermediate';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}