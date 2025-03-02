// vite.config.js
import path from 'path';
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
    },
  },
  plugins: [glsl(), tailwindcss()],
});
