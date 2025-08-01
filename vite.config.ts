/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/common/tests/setup.ts",
  },
});
