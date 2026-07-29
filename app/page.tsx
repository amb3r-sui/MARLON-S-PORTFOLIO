import Link from "next/link";
import { ArrowRight, Bot, Braces, DatabaseZap, FileCheck2, Network, Workflow } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CTA } from "@/components/ui/CTA";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillGroups, technologies } from "@/data/skills";

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
    <section className="tech-strip"><div className="container"><p>Tools and platforms I work with</p><div className="marquee">{technologies.map((tool) => <span key={tool}>{tool}</span>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-top"><SectionHeading eyebrow="Selected work" title="Automation systems built around real operations" description="Portfolio projects that demonstrate workflow mapping, system integration, validation, monitoring, and careful human handoffs." /><Link href="/projects" className="text-link">Explore all projects <ArrowRight size={17} /></Link></div><div className="project-grid">{projects.filter((p) => p.featured).map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section>
    <section className="section section-muted"><div className="container"><SectionHeading eyebrow="Services" title="Focused help for connected business systems" description="Practical automation support for small teams, operators, and growing businesses." /><div className="service-preview-grid">{services.slice(0, 6).map((service, index) => { const Icon = serviceIcons[index]; return <article className="mini-card" key={service.title}><Icon /><h3>{service.title}</h3><p>{service.summary}</p></article>; })}</div><Link className="button button-secondary section-button" href="/services">View all services <ArrowRight size={17} /></Link></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Method" title="A clear process from discovery to improvement" /><div className="process-grid">{process.map(([num, title, copy]) => <article className="process-card" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="section section-muted"><div className="container"><SectionHeading eyebrow="Capabilities" title="Technical depth across the automation stack" /><div className="skills-grid">{skillGroups.map((group) => <article className="skill-card" key={group.title}><h3>{group.title}</h3><div className="tag-row">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></article>)}</div></div></section>
    <CTA />
  </>;
}
