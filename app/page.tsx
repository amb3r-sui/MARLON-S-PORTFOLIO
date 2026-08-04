import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BracketsCurly,
  Database,
  FileText,
  FlowArrow,
  Robot,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CTA } from "@/components/ui/CTA";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { career } from "@/data/career";
import { ToolGrid } from "@/components/ui/ToolGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const serviceIcons = [FlowArrow, Robot, ShareNetwork, BracketsCurly, Database, FileText];

const principles = [
  ["Map the real process", "Start with inputs, owners, rules, and exceptions before choosing tools."],
  ["Control every write", "Use validation, duplicate prevention, approval gates, and clear failure paths."],
  ["Keep people responsible", "Let AI prepare decisions while humans retain authority where outcomes matter."],
  ["Document the handoff", "Leave readable logic, audit trails, and maintenance guidance behind."],
] as const;

export default function Home() {
  return (
    <>
      <Hero />

      <section className="evidence-strip" aria-label="Resume highlights">
        <div className="container evidence-grid">
          {career.evidence.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section systems-section">
        <ScrollReveal className="container">
          <div className="section-top">
            <SectionHeading
              title="Systems with visible safeguards"
              description="Explore the business problem, workflow logic, safe sample run, failure paths, and current project scope."
            />
            <Link href="/projects" className="text-link">
              View all projects <ArrowRight size={18} />
            </Link>
          </div>
          <div className="project-grid project-bento">
            {projects.filter((project) => project.featured).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="section section-muted">
        <ScrollReveal className="container method-layout">
          <figure className="editorial-figure editorial-figure-tall">
            <Image
              src="/images/editorial/human-review.webp"
              alt="A reviewer checking an automation approval sheet"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 44vw"
            />
          </figure>
          <div className="method-copy">
            <SectionHeading title="Reliability is designed in" description="The best automation is understandable before it is impressive." />
            <div className="principle-list">
              {principles.map(([title, copy]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="section">
        <ScrollReveal className="container">
          <SectionHeading
            title="Automation across the operating stack"
            description="Focused help for workflow orchestration, AI-assisted decisions, CRM operations, APIs, and data quality."
          />
          <div className="service-preview-grid service-bento">
            {services.slice(0, 6).map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <article className="mini-card" key={service.title}>
                  <span className="mini-card-icon"><Icon weight="bold" /></span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </article>
              );
            })}
          </div>
          <Link className="button button-secondary section-button" href="/services">
            View services <ArrowRight size={18} />
          </Link>
        </ScrollReveal>
      </section>

      <section className="tech-section">
        <ScrollReveal className="container">
          <SectionHeading
            title="Tools selected around the process"
            description="The stack spans automation, AI, data, CRM, development, and deployment. Logos identify technologies only."
          />
          <ToolGrid />
        </ScrollReveal>
      </section>

      <section className="section experience-section">
        <ScrollReveal className="container experience-layout">
          <div>
            <SectionHeading title="Hands-on work since 2024" description={career.summary} />
            <Link href="/about" className="text-link">Read the full background <ArrowRight size={18} /></Link>
          </div>
          <div className="experience-notes">
            {career.experience.highlights.map((item) => <p key={item}>{item}</p>)}
          </div>
        </ScrollReveal>
      </section>

      <CTA />
    </>
  );
}
