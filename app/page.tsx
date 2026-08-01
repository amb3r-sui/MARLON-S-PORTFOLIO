import Link from "next/link";
import { ArrowRight, Bot, Braces, DatabaseZap, FileCheck2, Network, Workflow } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CTA } from "@/components/ui/CTA";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillGroups } from "@/data/skills";
import { ToolGrid } from "@/components/ui/ToolGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const serviceIcons = [Workflow, Bot, Network, Braces, DatabaseZap, FileCheck2];
const process = [
  ["01", "Understand the Process", "Learn the real inputs, owners, rules, and exceptions."],
  ["02", "Map the Workflow", "Turn the current process into a clear automation plan."],
  ["03", "Build the Automation", "Connect tools with maintainable, readable workflow logic."],
  ["04", "Test Edge Cases", "Test invalid data, duplicates, provider failures, and retries."],
  ["05", "Document the System", "Explain setup, logic, handoffs, and maintenance."],
  ["06", "Monitor and Improve", "Review failures and refine the workflow as needs change."],
];

export default function Home() {
  return <>
    <Hero />
    <section className="section systems-section"><ScrollReveal className="container"><div className="section-top"><SectionHeading eyebrow="01 · Selected systems" title="Case studies that behave like working products" description="Open the canvas, test a fictional scenario, inspect the active route, and understand exactly where safeguards and human decisions live." /><Link href="/projects" className="text-link">Open project library <ArrowRight size={17} /></Link></div><div className="project-grid project-bento">{projects.filter((p) => p.featured).map((project) => <ProjectCard key={project.id} project={project} />)}</div></ScrollReveal></section>
    <section className="section section-muted"><ScrollReveal className="container"><SectionHeading eyebrow="02 · Systems capability" title="One operating layer across automation, AI, and CRM" description="The interface is designed to grow from n8n orchestration into future GoHighLevel pipelines, conversations, calendars, and client lifecycle automations." /><div className="service-preview-grid service-bento">{services.slice(0, 6).map((service, index) => { const Icon = serviceIcons[index]; return <article className="mini-card" key={service.title}><span className="mini-card-icon"><Icon /></span><h3>{service.title}</h3><p>{service.summary}</p><small>0{index + 1} · Capability</small></article>; })}</div><Link className="button button-secondary section-button" href="/services">View service details <ArrowRight size={17} /></Link></ScrollReveal></section>
    <section className="tech-section"><ScrollReveal className="container"><SectionHeading eyebrow="03 · Technology layer" title="A connected toolkit for modern operations" description="Tools are selected around the process—not forced into it. Brand marks identify technologies only and do not imply sponsorship, certification, or partnership." /><ToolGrid /></ScrollReveal></section>
    <section className="section"><ScrollReveal className="container"><SectionHeading eyebrow="04 · Delivery method" title="A controlled path from process mapping to improvement" description="Every engagement is designed to remain understandable, testable, and maintainable after delivery." /><div className="process-grid">{process.map(([num, title, copy]) => <article className="process-card" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></ScrollReveal></section>
    <section className="section section-muted"><ScrollReveal className="container"><SectionHeading eyebrow="05 · Technical coverage" title="An automation stack ready to grow with the business" /><div className="skills-grid">{skillGroups.map((group) => <article className="skill-card" key={group.title}><h3>{group.title}</h3><div className="tag-row">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></article>)}</div></ScrollReveal></section>
    <CTA />
  </>;
}
