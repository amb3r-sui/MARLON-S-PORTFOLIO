import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { label: "LinkedIn profile", href: profile.linkedIn, icon: Linkedin, external: true },
  { label: "GitHub profile", href: profile.github, icon: Github, external: true },
  { label: "Email Marlon Magno", href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export function SocialLinks({ labels = false }: { labels?: boolean }) {
  return (
    <div className={`social-links ${labels ? "with-labels" : ""}`}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <a key={label} href={href} aria-label={label} title={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          <Icon size={18} />
          {labels && <span>{label.replace(" profile", "").replace("Marlon Magno", "")}</span>}
        </a>
      ))}
    </div>
  );
}
