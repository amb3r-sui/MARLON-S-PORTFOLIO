import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";
export const metadata: Metadata = { title: "Contact", description: "Contact Marlon Magno about automation projects, collaborations, and remote AI Automation Specialist opportunities." };
export default function ContactPage() { return <section className="page-hero"><div className="container"><span className="eyebrow">Contact</span><h1>Tell me about the process you want to improve.</h1><p>Share the tools involved, the repetitive steps, and what a better outcome would look like. I’ll respond with practical next steps.</p></div><div className="container contact-layout"><aside className="contact-sidebar"><h2>Start a conversation</h2><p>For job opportunities, collaborations, or automation projects, use the form or contact me directly.</p><SocialLinks labels /><div className="location"><MapPin />{profile.location}</div><div className="honesty-note"><strong>MVP note</strong><p>This form only submits after a real endpoint is configured. It will never pretend an unconfigured message was sent.</p></div></aside><ContactForm /></div></section>; }
