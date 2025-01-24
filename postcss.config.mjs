/** @type {import('postcss-load-config').Config} */
// Import necessary plugins

import bundleAnalyzer from "@next/bundle-analyzer";

// Next.js configuration
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default withBundleAnalyzer(config);
