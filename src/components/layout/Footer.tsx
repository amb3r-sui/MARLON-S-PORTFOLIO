import Link from "next/link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link href="/" className="brand" prefetch={false}><span className="brand-mark">{profile.initials}</span><span>{profile.name}</span></Link>
          <p>{profile.title} building secure, reviewable business workflows.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} prefetch={false}>{item.label}</Link>)}
        </nav>
        <div className="footer-connect">
          <SocialLinks labels />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
