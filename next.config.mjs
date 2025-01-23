/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "barcode.tec-it.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "anotherdomain.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s8.uupload.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uupload.ir",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
