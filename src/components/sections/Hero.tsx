import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker">{profile.title}</p>
          <h1>Automation, built for trust.</h1>
          <p className="hero-intro">Secure n8n workflows, AI automations, and integrations with clear safeguards and human review.</p>
          <div className="button-row">
            <Link href="/projects" className="button button-primary">View projects <ArrowRight size={18} /></Link>
            <a href={profile.resumePath} download="marlon-magno-resume.pdf" className="button button-secondary">Download CV <DownloadSimple size={18} /></a>
          </div>
        </div>

        <figure className="hero-figure">
          <Image
            src="/images/editorial/workflow-mapping.webp"
            alt="Hands arranging a paper workflow map on a quiet desk"
            fill
            unoptimized
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <figcaption>Workflow mapping before implementation.</figcaption>
        </figure>
      </div>
    </section>
  );
}
