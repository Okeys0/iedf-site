import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this repo — the parent directory also has
    // a package-lock.json, which misdirects Next's root inference.
    root: __dirname,
  },
  images: {
    // Sanity's image CDN — added once the project is connected (see lib/sanity/client.ts)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
