export type ProjectCategory =
  | "AI Agents"
  | "n8n"
  | "CRM Automation"
  | "API Integration"
  | "Data Automation"
  | "Business Operations";

export interface ProjectImage {
  src: string;
  label: string;
  alt: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: "Portfolio Project";
  featured: boolean;
  summary: string;
  problem: string;
  solution: string;
  objective: string;
  targetUsers: string;
  tools: string[];
  features: string[];
  workflow: string[];
  challenges: string[];
  lessons: string[];
  expectedImpact: string;
  automationLogic: string;
  dataFlow: string;
  errorHandling: string;
  security: string;
  completed: string[];
  planned: string[];
  screenshots: ProjectImage[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface Service {
  title: string;
  summary: string;
  problem: string;
  deliverables: string[];
  tools: string[];
  benefit: string;
}
