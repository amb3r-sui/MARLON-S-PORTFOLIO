import Link from "next/link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";

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
          <SocialLinks />
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {profile.name}. {profile.title}.</div>
    </footer>
  );
}
