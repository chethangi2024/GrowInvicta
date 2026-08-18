/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/company",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
