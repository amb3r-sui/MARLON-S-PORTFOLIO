import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/profile";

const links = [
  { label: "LinkedIn", href: profile.linkedIn, icon: LinkedinLogo, external: true },
  { label: "GitHub", href: profile.github, icon: GithubLogo, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: EnvelopeSimple, external: false },
] as const;

export function SocialLinks({ labels = false }: { labels?: boolean }) {
  return (
    <div className={`social-links ${labels ? "with-labels" : ""}`}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <a key={label} href={href} aria-label={label} title={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          <Icon size={18} weight="bold" />
          {labels && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}
