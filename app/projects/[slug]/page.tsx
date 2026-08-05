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

function CaseSection({ step, title, intro, children }: { step: string; title: string; intro?: string; children: React.ReactNode }) {
  return <section className="case-section"><span className="case-section-label">{step}</span><h2>{title}</h2>{intro && <p className="case-intro">{intro}</p>}{children}</section>;
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
            <CaseSection step="01 · Context" title="Business problem">
              <p className="case-lead">{project.problem}</p>
              <p className="supporting-note"><strong>Built for:</strong> {project.targetUsers}</p>
            </CaseSection>

            <CaseSection step="02 · Value" title="Intended outcome">
              <p className="case-lead">{project.objective}</p>
              <div className="impact-note"><strong>Expected operational value</strong><p>{project.businessImpact}</p><small>Design intent shown through a portfolio simulation, not a claim of measured client results.</small></div>
            </CaseSection>

            <CaseSection step="03 · Approach" title="Solution summary">
              <p className="case-lead">{project.solution}</p>
            </CaseSection>

            <CaseSection step="04 · Ownership" title="My responsibilities and technical decisions">
              <div className="case-overview case-overview-two">
                <div><h3>My responsibilities</h3><ul>{project.personalContribution.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Technical decisions</h3><p>{project.automationLogic}</p></div>
              </div>
            </CaseSection>

            {project.demoMode === "simulation" && project.demoScenarios.length > 0 && (
              <CaseSection step="05 · Demonstration" title="Interactive demonstration" intro="Choose fictional data, review the expected safeguard, run the workflow, and inspect the simulated result.">
                <WorkflowDemo project={project} />
              </CaseSection>
            )}

            <CaseSection step="06 · Reliability" title="Safeguards and failure handling">
              <div className="reliability-layout">
                <div><h3>Error handling</h3><p>{project.errorHandling}</p></div>
                <aside><ShieldCheck size={24} weight="bold" /><h3>Security considerations</h3><p>{project.security}</p></aside>
              </div>
              <div className="reliability-rules"><h3>Validation boundaries</h3><ul>{project.validationRules.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </CaseSection>

            <CaseSection step="07 · Inspection" title="Technical details" intro="Open only the implementation evidence you want to inspect.">
              <div className="case-disclosures">
                <details>
                  <summary>Workflow architecture <span>{project.workflow.length} stages</span></summary>
                  <div className="disclosure-content"><WorkflowDiagram steps={project.workflow} /><h3>Data flow</h3><p>{project.dataFlow}</p></div>
                </details>
                <details>
                  <summary>Inputs, outputs, and capabilities <span>Data contract</span></summary>
                  <div className="disclosure-content data-contract">
                    <div><h3>Inputs</h3><ul>{project.inputs.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><h3>Outputs</h3><ul>{project.outputs.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><h3>Capabilities</h3><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  </div>
                </details>
                <details>
                  <summary>Project evidence and lessons <span>Optional review</span></summary>
                  <div className="disclosure-content learning-layout">
                    <div><h3>Challenges</h3><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><h3>Lessons</h3><ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div className="screenshot-grid">{project.screenshots.map((image) => <ImageFallback key={image.src} {...image} />)}</div>
                  </div>
                </details>
              </div>
            </CaseSection>

            <CaseSection step="08 · Scope" title="Future improvements">
              <div className="delivery-grid">
                <div><h3>Completed</h3>{project.completed.map((item) => <p key={item}><CheckCircle weight="fill" />{item}</p>)}</div>
                <div><h3>Planned</h3>{project.planned.map((item) => <p key={item}><ArrowRight />{item}</p>)}</div>
                <div><h3>Current limitations</h3><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>Future improvements</h3><ul>{project.futureImprovements.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </CaseSection>
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
