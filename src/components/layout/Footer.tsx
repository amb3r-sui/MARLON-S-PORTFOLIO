import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand"><span className="brand-mark">{profile.initials}</span><span>{profile.name}</span></Link>
          <p>Building practical automation systems for modern businesses.</p>
        </div>
        <div>
          <span className="eyebrow">Navigate</span>
          <div className="footer-links">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        </div>
        <div>
          <span className="eyebrow">Connect</span>
          <div className="social-row">
            <a href={profile.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {profile.name}. {profile.title}.</div>
    </footer>
  );
}
