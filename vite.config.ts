import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const isPages = process.env.GITHUB_PAGES === "1";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "github-pages-extras",
      closeBundle() {
        if (!isPages) return;
        const out = resolve(__dirname, "docs");
        copyFileSync(resolve(out, "index.html"), resolve(out, "404.html"));
        writeFileSync(resolve(out, ".nojekyll"), "");
      },
    },
  ],
  base: isPages ? "/lizheng-ai-clone/" : "/",
  build: {
    outDir: isPages ? "docs" : "dist",
    emptyOutDir: true,
  },
});
