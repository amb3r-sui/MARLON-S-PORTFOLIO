import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowSquareOut, CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { WorkflowDiagram } from "@/components/projects/WorkflowDiagram";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { CTA } from "@/components/ui/CTA";
import { getProject, projects } from "@/data/projects";
import { WorkflowDemo } from "@/components/projects/WorkflowDemo";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: project.title, description: project.summary, url, type: "article", images: ["/og-portfolio.png"] },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: ["/og-portfolio.png"] },
  };
}

function CaseSection({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return <section className="case-section"><span className="case-section-label">{title}</span><h2>{title}</h2>{intro && <p className="case-intro">{intro}</p>}{children}</section>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article>
        <header className="case-hero">
          <div className="container">
            <Link href="/projects" className="back-link"><ArrowLeft size={17} /> All projects</Link>
            <div className="case-hero-grid">
              <div>
                <div className="case-meta"><span>{project.category}</span><span>{project.projectType}</span></div>
                <h1>{project.title}</h1>
                <p>{project.summary}</p>
                <div className="tag-row">{project.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
                <div className="implementation-state">
                  {project.githubUrl ? <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View repository <ArrowSquareOut size={17} /></a> : <span>Private implementation</span>}
                  {project.demoMode === "simulation" ? <span>Safe simulation below</span> : project.demoUrl ? <a className="text-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">External demo <ArrowSquareOut size={17} /></a> : <span>Demo not published</span>}
                </div>
              </div>
              <ImageFallback {...project.screenshots[0]} />
            </div>
          </div>
        </header>

        <div className="container case-layout">
          <div className="case-main">
            <CaseSection title="The system">
              <div className="case-overview">
                <div><h3>Business problem</h3><p>{project.problem}</p></div>
                <div><h3>Objective</h3><p>{project.objective}</p><p className="supporting-note"><strong>Built for:</strong> {project.targetUsers}</p></div>
                <div><h3>Solution</h3><p>{project.solution}</p></div>
              </div>
            </CaseSection>

            {project.demoMode === "simulation" && project.demoScenarios.length > 0 && (
              <CaseSection title="Test the business outcome" intro="Choose fictional data, run the workflow, and inspect its route, safeguard, and result.">
                <WorkflowDemo project={project} />
              </CaseSection>
            )}

            <CaseSection title="Workflow">
              <WorkflowDiagram steps={project.workflow} />
            </CaseSection>

            <CaseSection title="Reliability by design">
              <div className="reliability-layout">
                <div><h3>Automation logic</h3><p>{project.automationLogic}</p></div>
                <div><h3>Data flow</h3><p>{project.dataFlow}</p></div>
                <div><h3>Error handling</h3><p>{project.errorHandling}</p></div>
                <aside><ShieldCheck size={24} weight="bold" /><h3>Security considerations</h3><p>{project.security}</p></aside>
              </div>
            </CaseSection>

            <CaseSection title="Inputs, outputs, and validation">
              <div className="data-contract">
                <div><h3>Inputs</h3><ul>{project.inputs.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Outputs</h3><ul>{project.outputs.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Validation</h3><ul>{project.validationRules.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </CaseSection>

            <CaseSection title="Delivery status">
              <div className="delivery-grid">
                <div><h3>Completed</h3>{project.completed.map((item) => <p key={item}><CheckCircle weight="fill" />{item}</p>)}</div>
                <div><h3>Planned</h3>{project.planned.map((item) => <p key={item}><ArrowRight />{item}</p>)}</div>
                <div><h3>Key capabilities</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
                <div><h3>My contribution</h3><ul>{project.personalContribution.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </CaseSection>

            <CaseSection title="Project evidence">
              <div className="screenshot-grid">{project.screenshots.map((image) => <ImageFallback key={image.src} {...image} />)}</div>
            </CaseSection>

            <CaseSection title="What this project taught me">
              <div className="learning-layout">
                <div><h3>Challenges</h3><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Lessons</h3><ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <details><summary>Current limitations</summary><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></details>
                <details><summary>Future improvements</summary><ul>{project.futureImprovements.map((item) => <li key={item}>{item}</li>)}</ul></details>
              </div>
            </CaseSection>

            <div className="impact-note"><strong>Expected operational impact</strong><p>{project.businessImpact}</p><small>This is an expected impact statement, not a claim of verified client results.</small></div>
          </div>

          <aside className="case-sidebar">
            <div>
              <h2>Project summary</h2>
              <dl>
                <div><dt>Status</dt><dd>{project.status}</dd></div>
                <div><dt>Category</dt><dd>{project.category}</dd></div>
                <div><dt>Results</dt><dd>Not independently verified</dd></div>
              </dl>
            </div>
          </aside>
        </div>

        <nav className="container project-nav" aria-label="Project navigation">
          <Link href={`/projects/${previous.slug}`}><ArrowLeft /><span><small>Previous project</small>{previous.title}</span></Link>
          <Link href={`/projects/${next.slug}`}><span><small>Next project</small>{next.title}</span><ArrowRight /></Link>
        </nav>
      </article>
      <CTA />
    </>
  );
}
