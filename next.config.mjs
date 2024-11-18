import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NODE_ENV === "development") {
  try {
    setupDevPlatform();
  } catch (e) {
    console.warn("Failed to setup dev platform:", e);
  }
}

export default nextConfig; 