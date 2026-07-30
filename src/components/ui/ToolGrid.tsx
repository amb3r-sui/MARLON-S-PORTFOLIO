import type { CSSProperties } from "react";
import { Bot, Braces, DatabaseZap, Webhook } from "lucide-react";
import {
  siAirtable,
  siDiscord,
  siGithub,
  siGooglecalendar,
  siGooglesheets,
  siJavascript,
  siN8n,
  siOdoo,
  siSupabase,
  siTypescript,
  siZoho,
  type SimpleIcon,
} from "simple-icons";
import { technologies, type TechnologyIcon } from "@/data/skills";

const brandIcons: Partial<Record<TechnologyIcon, SimpleIcon>> = {
  n8n: siN8n,
  supabase: siSupabase,
  odoo: siOdoo,
  zoho: siZoho,
  airtable: siAirtable,
  googleSheets: siGooglesheets,
  googleCalendar: siGooglecalendar,
  javascript: siJavascript,
  typescript: siTypescript,
  discord: siDiscord,
  github: siGithub,
};

const conceptIcons = { webhook: Webhook, api: Braces, ai: Bot, rag: DatabaseZap } as const;

function BrandMark({ icon, name }: { icon: SimpleIcon; name: string }) {
  return (
    <svg className={`tool-icon brand-${icon.slug}`} viewBox="0 0 24 24" role="img" aria-label={`${name} logo`} style={{ "--brand-color": `#${icon.hex}` } as CSSProperties}>
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}

export function ToolGrid() {
  return (
    <div className="tool-grid">
      {technologies.map((tool) => {
        const brand = brandIcons[tool.icon];
        const ConceptIcon = conceptIcons[tool.icon as keyof typeof conceptIcons];
        return (
          <div className="tool-tile" key={tool.name} tabIndex={0} aria-label={`${tool.name}. Technology used in portfolio workflows.`}>
            {brand ? <BrandMark icon={brand} name={tool.name} /> : <ConceptIcon className="tool-icon concept-icon" aria-hidden="true" />}
            <span>{tool.name}</span>
          </div>
        );
      })}
    </div>
  );
}
