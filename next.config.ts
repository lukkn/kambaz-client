import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["import", "color-functions", "mixed-decals"],
  },
};

export default nextConfig;
