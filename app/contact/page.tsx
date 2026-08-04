import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";

export const metadata: Metadata = { title: "Contact", description: "Contact Marlon Magno about automation projects, collaborations, and remote roles.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <section className="page-hero contact-page">
      <div className="container contact-heading">
        <span className="eyebrow">Contact</span>
        <h1>What process needs to improve?</h1>
        <p>Share the tools, repetitive steps, and the outcome your team needs.</p>
      </div>
      <div className="container contact-layout">
        <aside className="contact-sidebar">
          <h2>Direct contact</h2>
          <p>For automation work, collaborations, or remote opportunities, use the form or contact me directly.</p>
          <div className="contact-details">
            <a href={`mailto:${profile.email}`}><EnvelopeSimple weight="bold" /><span>{profile.email}</span></a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}><Phone weight="bold" /><span>{profile.phone}</span></a>
            <span><MapPin weight="bold" />{profile.location}</span>
          </div>
          <SocialLinks labels />
          <div className="honesty-note"><strong>Form status</strong><p>The form only submits after a real endpoint is configured. It never reports an unconfigured message as sent.</p></div>
        </aside>
        <ContactForm />
      </div>
    </section>
  );
}
