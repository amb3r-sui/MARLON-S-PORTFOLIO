"use client";
import { ImageSquare } from "@phosphor-icons/react";
import { useState } from "react";

export function ImageFallback({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="image-placeholder" role="img" aria-label={`${alt} placeholder`}><ImageSquare /><span>{label}</span><small>Image unavailable</small></div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="project-image" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
