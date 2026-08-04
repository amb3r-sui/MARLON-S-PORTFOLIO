import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CTA } from "@/components/ui/CTA";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Services", description: "Workflow automation, AI, CRM, API integration, data quality, testing, and documentation services.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">Services</span>
          <h1>Help for processes that should run better.</h1>
          <p>I map, build, test, and document automation with clear ownership and safe failure paths.</p>
        </div>
      </section>
      <section className="section no-top">
        <div className="container service-index">
          {services.map((service) => (
            <details className="service-row" key={service.title}>
              <summary>
                <span><strong>{service.title}</strong><small>{service.summary}</small></span>
                <span className="service-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="service-row-content">
                <div><h3>Business problem</h3><p>{service.problem}</p></div>
                <div><h3>What I can build</h3><ul>{service.deliverables.map((item) => <li key={item}><CheckCircle weight="fill" />{item}</li>)}</ul></div>
                <div><h3>Expected benefit</h3><p>{service.benefit}</p><div className="tag-row">{service.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div></div>
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="text-link">Discuss this service <ArrowRight size={18} /></Link>
              </div>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
