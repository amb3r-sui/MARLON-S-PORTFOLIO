export type TechnologyIcon =
  | "n8n" | "supabase" | "odoo" | "zoho" | "airtable" | "googleSheets"
  | "googleCalendar" | "javascript" | "typescript" | "discord" | "github"
  | "webhook" | "api" | "ai" | "rag";

export const technologies: { name: string; icon: TechnologyIcon; kind: "brand" | "concept" }[] = [
  { name: "n8n", icon: "n8n", kind: "brand" },
  { name: "Supabase", icon: "supabase", kind: "brand" },
  { name: "Odoo", icon: "odoo", kind: "brand" },
  { name: "Zoho CRM", icon: "zoho", kind: "brand" },
  { name: "Airtable", icon: "airtable", kind: "brand" },
  { name: "Google Sheets", icon: "googleSheets", kind: "brand" },
  { name: "Google Calendar", icon: "googleCalendar", kind: "brand" },
  { name: "Webhooks", icon: "webhook", kind: "concept" },
  { name: "REST APIs", icon: "api", kind: "concept" },
  { name: "JavaScript", icon: "javascript", kind: "brand" },
  { name: "TypeScript", icon: "typescript", kind: "brand" },
  { name: "AI models", icon: "ai", kind: "concept" },
  { name: "RAG systems", icon: "rag", kind: "concept" },
  { name: "Discord", icon: "discord", kind: "brand" },
  { name: "GitHub", icon: "github", kind: "brand" },
];

export const skillGroups = [
  { title: "Automation", items: ["n8n", "Workflow design", "Webhooks", "Scheduling", "Conditional logic", "Error handling", "Data validation"] },
  { title: "Integrations", items: ["REST APIs", "CRM systems", "Databases", "Google Workspace", "Business applications"] },
  { title: "AI", items: ["AI agents", "Prompt engineering", "RAG", "Structured output", "AI-assisted workflows", "Deduplication", "Token usage control"] },
  { title: "Development", items: ["JavaScript", "TypeScript", "React", "Next.js", "Supabase", "Git", "GitHub"] },
] as const;
