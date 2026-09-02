/** @type {import('next').NextConfig} */
// BASE_PATH is set by the GitHub Pages workflow (/ysa). Leave unset for the real domain.
const basePath = process.env.BASE_PATH || '';
const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
