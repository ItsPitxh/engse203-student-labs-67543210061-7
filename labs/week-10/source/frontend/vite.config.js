import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/engse203-student-labs-67543210061-7/labs/week-10/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});