import { BracketsCurly, Database, Robot, WebhooksLogo } from "@phosphor-icons/react/dist/ssr";
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

const conceptIcons = { webhook: WebhooksLogo, api: BracketsCurly, ai: Robot, rag: Database } as const;

function BrandMark({ icon, name }: { icon: SimpleIcon; name: string }) {
  return <svg className="tool-icon" viewBox="0 0 24 24" role="img" aria-label={`${name} logo`}><path fill="currentColor" d={icon.path} /></svg>;
}

export function ToolGrid() {
  return (
    <div className="tool-grid" role="list" aria-label="Technical toolkit">
      {technologies.map((tool) => {
        const brand = brandIcons[tool.icon];
        const ConceptIcon = conceptIcons[tool.icon as keyof typeof conceptIcons];
        return (
          <div className="tool-tile" key={tool.name} role="listitem">
            {brand ? <BrandMark icon={brand} name={tool.name} /> : <ConceptIcon className="tool-icon concept-icon" weight="bold" aria-hidden="true" />}
            <span>{tool.name}</span>
          </div>
        );
      })}
    </div>
  );
}
