"use client";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

export function ImageFallback({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="image-placeholder" role="img" aria-label={`${alt} placeholder`}><ImageIcon /><span>{label}</span><small>Add image to public/images/projects</small></div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="project-image" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
