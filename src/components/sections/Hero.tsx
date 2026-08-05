import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker">{profile.title}</p>
          <h1>AI automation systems built for real operations.</h1>
          <p className="hero-intro">I design AI agents, workflow automation, integrations, safeguards, and operational tools for service businesses and operations teams.</p>
          <p className="hero-value">Reduce repetitive work, clarify handoffs, and keep important decisions under human control.</p>
          <div className="button-row">
            <Link href="/projects" className="button button-primary">View projects <ArrowRight size={18} /></Link>
            <Link href="/contact" className="button button-secondary">Discuss a role or project <ChatCircleText size={18} /></Link>
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
