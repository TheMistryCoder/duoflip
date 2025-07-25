import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".", // Root project folder
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // src folder
    },
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.cjs"), // postcss config
  },
  build: {
    outDir: "dist", // relative to client folder (repo root)
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
