import { profile } from "./profile";

export const socials = [
  { label: "LinkedIn", href: profile.linkedIn },
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
] as const;
