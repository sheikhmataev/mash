/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix since we're using a custom domain
};

export default nextConfig;
