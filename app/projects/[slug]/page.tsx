import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { WorkflowDiagram } from "@/components/projects/WorkflowDiagram";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { CTA } from "@/components/ui/CTA";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${project.slug}` } };
}

function CaseSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="case-section"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children}</section>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <>
    <article>
      <header className="case-hero"><div className="container"><Link href="/projects" className="back-link"><ArrowLeft size={16} /> All projects</Link><div className="case-meta"><span>{project.category}</span><span>{project.status}</span></div><h1>{project.title}</h1><p>{project.summary}</p><div className="tag-row">{project.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>{(project.githubUrl || project.demoUrl) && <div className="button-row">{project.githubUrl && <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ExternalLink size={16} /></a>}{project.demoUrl && <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ExternalLink size={16} /></a>}</div>}</div></header>
      <div className="container case-layout">
        <main className="case-main">
          <CaseSection eyebrow="Context" title="Business problem"><p>{project.problem}</p></CaseSection>
          <CaseSection eyebrow="Objective" title="What this project is designed to do"><p>{project.objective}</p><div className="info-callout"><strong>Target users</strong><p>{project.targetUsers}</p></div></CaseSection>
          <CaseSection eyebrow="Solution" title="System overview"><p>{project.solution}</p></CaseSection>
          <CaseSection eyebrow="Workflow" title="Step-by-step process"><WorkflowDiagram steps={project.workflow} /></CaseSection>
          <CaseSection eyebrow="Architecture" title="Automation logic and data flow"><div className="two-card-grid"><div><h3>Automation logic</h3><p>{project.automationLogic}</p></div><div><h3>Data flow</h3><p>{project.dataFlow}</p></div></div></CaseSection>
          <CaseSection eyebrow="Reliability" title="Error handling and security"><div className="two-card-grid"><div><h3>Error handling</h3><p>{project.errorHandling}</p></div><div><h3><ShieldCheck size={20} /> Security considerations</h3><p>{project.security}</p></div></div></CaseSection>
          <CaseSection eyebrow="Capabilities" title="Key features"><div className="feature-list">{project.features.map((feature) => <div key={feature}><CheckCircle2 />{feature}</div>)}</div></CaseSection>
          <CaseSection eyebrow="Project status" title="Completed functionality and planned improvements"><div className="status-columns"><div><span>Completed</span>{project.completed.map((item) => <p key={item}><CheckCircle2 />{item}</p>)}</div><div><span>Planned</span>{project.planned.map((item) => <p key={item}><ArrowRight />{item}</p>)}</div></div></CaseSection>
          <CaseSection eyebrow="Learning" title="Challenges and lessons"><div className="two-card-grid"><div><h3>Challenges</h3><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Lessons learned</h3><ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul></div></div></CaseSection>
          <CaseSection eyebrow="Evidence" title="Screenshots and workflow views"><div className="screenshot-grid">{project.screenshots.map((image) => <ImageFallback key={image.src} {...image} />)}</div></CaseSection>
          <CaseSection eyebrow="Expected operational impact" title="A more consistent, traceable process"><p>{project.expectedImpact}</p><p className="honesty-line">This is an expected impact statement, not a claim of verified client results.</p></CaseSection>
        </main>
        <aside className="case-sidebar"><div><span className="eyebrow">Project summary</span><dl><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Category</dt><dd>{project.category}</dd></div><div><dt>Tools</dt><dd>{project.tools.join(", ")}</dd></div><div><dt>Results</dt><dd>Not yet independently verified</dd></div></dl></div></aside>
      </div>
      <nav className="container project-nav" aria-label="Project navigation"><Link href={`/projects/${previous.slug}`}><ArrowLeft /> <span><small>Previous project</small>{previous.title}</span></Link><Link href={`/projects/${next.slug}`}><span><small>Next project</small>{next.title}</span><ArrowRight /></Link></nav>
    </article>
    <CTA />
  </>;
}
