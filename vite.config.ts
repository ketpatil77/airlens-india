import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: {
      "/api/openaq": {
        target: "https://api.openaq.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openaq/, ""),
      },
      "/api/open-meteo": {
        target: "https://air-quality-api.open-meteo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/open-meteo/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          recharts: ["recharts"],
          gsap: ["gsap"],
          framer: ["framer-motion"],
          // U7: Split Three.js + R3F (~800KB) out of initial bundle
          three: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
