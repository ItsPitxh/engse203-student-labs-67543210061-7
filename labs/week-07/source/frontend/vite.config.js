import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/engse203-student-labs-<student-id>/labs/week-07/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});