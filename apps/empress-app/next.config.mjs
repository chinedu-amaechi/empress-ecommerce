/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@backend": path.resolve(__dirname, "../../backend"),
    };
    return config;
  },
};

export default nextConfig;
