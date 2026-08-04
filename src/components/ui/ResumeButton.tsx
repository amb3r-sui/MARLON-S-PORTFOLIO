import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/profile";

export function ResumeButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={profile.resumePath}
      download="marlon-magno-resume.pdf"
      className={`button button-secondary ${compact ? "button-small" : ""}`}
    >
      <DownloadSimple size={compact ? 15 : 18} /> Download CV
    </a>
  );
}
