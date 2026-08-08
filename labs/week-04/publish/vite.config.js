import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // MUST match the format from Section 9:
  base: '/engse203-student-labs-<student-id>/labs/week-04/', 
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});