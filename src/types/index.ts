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

export type DemoOutcome = "success" | "validation-error" | "duplicate" | "provider-failure" | "rate-limited";

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  outcome: DemoOutcome;
  sampleInput: Record<string, string>;
  sampleOutput: string;
}

export type WorkflowNodeKind =
  | "manual" | "schedule" | "webhook" | "execute" | "code" | "condition"
  | "postgres" | "gemini" | "calendar" | "gmail" | "odoo" | "rag"
  | "parser" | "merge" | "wait" | "error" | "response";

export interface WorkflowExplorerNode {
  id: string;
  label: string;
  subtitle: string;
  kind: WorkflowNodeKind;
  x: number;
  y: number;
  details: string;
}

export interface WorkflowExplorerEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface WorkflowExplorerDefinition {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  trigger: string;
  width: number;
  height: number;
  nodes: WorkflowExplorerNode[];
  edges: WorkflowExplorerEdge[];
  paths: Partial<Record<DemoOutcome, string[]>>;
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
  projectType: "Self-initiated portfolio project" | "Prototype implementation";
  inputs: string[];
  outputs: string[];
  validationRules: string[];
  businessImpact: string;
  personalContribution: string[];
  limitations: string[];
  futureImprovements: string[];
  architecture: string[];
  demoMode: "simulation" | "none";
  demoScenarios: DemoScenario[];
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
