export const technologies = [
  "n8n", "Supabase", "Odoo", "Zoho CRM", "Airtable", "Google Sheets",
  "Google Calendar", "Webhooks", "REST APIs", "JavaScript", "TypeScript",
  "AI models", "RAG systems", "Discord", "GitHub",
];

export const skillGroups = [
  { title: "Automation", items: ["n8n", "Workflow design", "Webhooks", "Scheduling", "Conditional logic", "Error handling", "Data validation"] },
  { title: "Integrations", items: ["REST APIs", "CRM systems", "Databases", "Google Workspace", "Business applications"] },
  { title: "AI", items: ["AI agents", "Prompt engineering", "RAG", "Structured output", "AI-assisted workflows", "Deduplication", "Token usage control"] },
  { title: "Development", items: ["JavaScript", "TypeScript", "React", "Next.js", "Supabase", "Git", "GitHub"] },
] as const;
