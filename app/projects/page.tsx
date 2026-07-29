import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
export const metadata: Metadata = { title: "Automation Projects", description: "Explore AI agents, n8n workflows, CRM automation, API integrations, and data automation case studies." };
export default function ProjectsPage() { return <section className="page-hero"><div className="container"><span className="eyebrow">Project library</span><h1>Systems designed to make operations more reliable.</h1><p>Every case study explains the business problem, workflow logic, safeguards, and expected operational impact—without invented results.</p></div><div className="container page-content"><ProjectFilters /></div></section>; }
