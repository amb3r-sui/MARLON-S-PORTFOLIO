import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Eye, FlowArrow, GitBranch, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/types";
import { workflowsByProject } from "@/data/workflows";

export function ProjectCard({ project }: { project: Project }) {
  const workflows = workflowsByProject[project.slug] ?? [];
  const nodeCount = workflows.reduce((total, workflow) => total + workflow.nodes.length, 0);
  const image = project.screenshots[0];
  const reviewBoundary = project.features.find((feature) => /human review|human approval/i.test(feature))
    ?? (/review|approval|human/i.test(`${project.objective} ${project.errorHandling}`)
      ? "Human review retained"
      : "Validation and exception review");

  return (
    <Link href={`/projects/${project.slug}`} className="project-card-shell" aria-label={`View ${project.title}`}>
      <article className="project-card">
        <div className="project-visual">
          <Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 42vw" />
        </div>
        <div className="project-card-body">
          <div className="card-meta"><span>{project.category}</span><span>{project.status}</span></div>
          <h3>{project.title}</h3>
          <div className="project-card-story">
            <div><span>Business problem</span><p>{project.problem}</p></div>
            <div><span>Intended outcome</span><p>{project.businessImpact}</p></div>
          </div>
          <div className="project-card-boundaries">
            <span><Eye size={16} weight="bold" />{project.demoMode === "simulation" ? "Interactive sample-data demo" : "Case study only"}</span>
            <span><ShieldCheck size={16} weight="bold" />{reviewBoundary}</span>
          </div>
          <div className="project-tools-label"><CheckCircle size={16} weight="bold" /> Main systems and tools</div>
          <div className="tag-row">{project.tools.slice(0, 4).map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
          {workflows.length > 0 && (
            <div className="workflow-card-facts" aria-label="Documented workflow structure">
              <span><FlowArrow size={16} weight="bold" />{workflows.length} {workflows.length === 1 ? "workflow" : "workflows"}</span>
              <span><GitBranch size={16} weight="bold" />{nodeCount} nodes</span>
            </div>
          )}
          <span className="project-card-link">View project and demonstration <ArrowUpRight size={18} weight="bold" /></span>
        </div>
      </article>
    </Link>
  );
}
