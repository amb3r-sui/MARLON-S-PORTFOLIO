import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All portfolio imagery is pre-compressed and shipped from /public. Keeping
  // it unoptimized avoids an unavailable image worker in Cloudflare previews.
  images: { unoptimized: true },
};

export default nextConfig;
