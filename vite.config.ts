// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss(), legacy()],
  server: {
    host: "localhost",
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        contact: path.resolve(__dirname, "contact.html"),
        blog_single: path.resolve(__dirname, "blog_single.html"),
        term_of_use: path.resolve(__dirname, "term_of_use.html"),
        privacy_policy: path.resolve(__dirname, "privacy_policy.html"),
      },
    },
  },
});
