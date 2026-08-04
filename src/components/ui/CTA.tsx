import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CTA() {
  return (
    <section className="section cta-section">
      <div className="container cta-panel">
        <div>
          <h2>Have a process that should run better?</h2>
          <p>Share the tools, repetitive steps, and desired outcome. I will help map a practical next step.</p>
        </div>
        <Link className="button button-primary" href="/contact">Contact <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
