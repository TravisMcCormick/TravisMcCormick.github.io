import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages can't set response headers, so ship the CSP as a meta tag.
// Build-only so it never interferes with the dev server's HMR socket.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.gr-assets.com",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

function cspMeta(): Plugin {
  return {
    name: "csp-meta",
    apply: "build",
    transformIndexHtml(html) {
      // Right after <meta charset> so it governs every later tag.
      return html.replace(
        /(<meta charset=[^>]*>)/i,
        `$1\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
      );
    },
  };
}

// User site served from the domain root, so base stays "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), cspMeta()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the big, rarely-changing deps into their own long-lived chunks
        // so the app chunk stays small and cache-friendly.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["motion", "motion/react"],
          icons: ["@phosphor-icons/react"],
        },
      },
    },
  },
});
