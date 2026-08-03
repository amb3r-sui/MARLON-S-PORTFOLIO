import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { workflowsByProject } from "@/data/workflows";
import { projects } from "@/data/projects";
export const metadata: Metadata = { title: "Automation Projects", description: "Explore AI agents, n8n workflows, CRM automation, API integrations, and data automation case studies." };
export default function ProjectsPage() {
  const workflows = Object.values(workflowsByProject).flat();
  const nodeCount = workflows.reduce((total, workflow) => total + workflow.nodes.length, 0);
  const connectionCount = workflows.reduce((total, workflow) => total + workflow.edges.length, 0);

  return <section className="page-hero project-lab-page">
    <div className="container">
      <span className="eyebrow">Interactive automation portfolio</span>
      <h1>Enter the Project Lab.</h1>
      <p>Explore sanitized reconstructions of the actual portfolio workflows. Every card below uses the documented workflow names, triggers, nodes, connections, and tools—then opens a safe sample-data demonstration.</p>
      <div className="project-lab-status" aria-label="Project lab coverage">
        <div><strong>{projects.length}</strong><span>Documented systems</span></div>
        <div><strong>{workflows.length}</strong><span>Sanitized workflows</span></div>
        <div><strong>{nodeCount}</strong><span>Modeled nodes</span></div>
        <div><strong>{connectionCount}</strong><span>Mapped connections</span></div>
      </div>
    </div>
    <div className="container page-content"><ProjectFilters /></div>
  </section>;
}
