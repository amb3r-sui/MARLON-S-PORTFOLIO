import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, GraduationCap, MapPin } from "@phosphor-icons/react/dist/ssr";
import { CTA } from "@/components/ui/CTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { career } from "@/data/career";
import { skillGroups } from "@/data/skills";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { ToolGrid } from "@/components/ui/ToolGrid";

export const metadata: Metadata = { title: "About", description: "Marlon Magno's experience, education, and practical approach to automation and systems integration.", alternates: { canonical: "/about" } };

const approach = [
  "Understand the real business process",
  "Validate data before processing",
  "Keep humans involved in important decisions",
  "Plan for duplicates, errors, and provider failures",
  "Protect credentials and customer information",
  "Document setup, logic, and maintenance",
] as const;

const building = ["AI receptionists", "CRM workflows", "Inventory automations", "Quotation systems", "Data synchronization", "Approval workflows"] as const;

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <span className="eyebrow">About Marlon</span>
            <h1>Practical automation, clearly explained.</h1>
            <p>{career.summary}</p>
            <div className="button-row"><ResumeButton /><Link className="button button-secondary" href="/contact">Contact</Link></div>
          </div>
          <figure className="editorial-figure">
            <Image src="/images/editorial/integration-workbench.webp" alt="A compact network hub beside a hand-drawn integration map" fill unoptimized sizes="(max-width: 760px) 100vw, 46vw" />
          </figure>
        </div>
      </section>

      <section className="evidence-strip" aria-label="Career highlights">
        <div className="container evidence-grid">
          {career.evidence.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
        </div>
      </section>

      <section className="section">
        <div className="container approach-layout">
          <SectionHeading eyebrow="Approach" title="How I approach the work" description="Clear logic over unnecessary complexity. Verified data over confident guesses." />
          <div className="check-list">
            {approach.map((item) => <div key={item}><Check weight="bold" />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container resume-layout">
          <div>
            <SectionHeading eyebrow="Experience" title={career.experience.role} description={career.experience.organization} />
            <div className="resume-meta"><span><MapPin weight="bold" />{career.experience.location}</span><span>{career.experience.dates}</span></div>
            <div className="experience-notes">{career.experience.highlights.map((item) => <p key={item}>{item}</p>)}</div>
          </div>
          <aside className="education-panel">
            <GraduationCap size={28} weight="bold" />
            <h3>{career.education.institution}</h3>
            <p>{career.education.program}</p>
            <span>{career.education.dates}</span>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Skills" title="Technical coverage" description="Skills span the full automation lifecycle, from discovery and API contracts to deployment and recovery paths." />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tag-row">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="tool-grid-wrap"><ToolGrid /></div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container building-layout">
          <SectionHeading eyebrow="Current work" title="Systems I am building" description="Portfolio projects are grounded in practical operating problems and clearly labeled as self-directed work." />
          <div className="building-grid">{building.map((item) => <div key={item}>{item}</div>)}</div>
        </div>
      </section>
      <CTA />
    </>
  );
}
