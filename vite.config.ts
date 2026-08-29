import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// travismccormick.github.io is a GitHub *user* site, served from the domain
// root, so the base path stays "/". A project site would need "/repo-name/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
