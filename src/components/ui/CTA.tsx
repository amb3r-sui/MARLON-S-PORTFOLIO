import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-panel">
          <div><span className="eyebrow">Let’s build something reliable</span><h2>Have a repetitive business process that should be automated?</h2><p>Let’s discuss how it can be turned into a clear, maintainable workflow.</p></div>
          <div className="button-row"><Link className="button button-primary" href="/contact">Contact Me <ArrowRight size={17} /></Link><Link className="button button-secondary" href="/projects">View Projects</Link></div>
        </div>
      </div>
    </section>
  );
}
