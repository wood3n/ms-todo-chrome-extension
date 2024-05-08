import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr()],
  source: {
    // 当 entry 为 index 时，可通过 / 访问页面；当 entry 为 option 时，可通过 /option 访问该页面
    entry: {
      popup: "./src/entries/popup/index.tsx",
      option: "./src/entries/option/index.tsx",
      background: {
        import: "./src/entries/popup/background.ts",
        filename: "background.js",
      },
    },
  },
  output: {
    copy:
      process.env.NODE_ENV === "development"
        ? [{ from: "./public", to: "" }]
        : undefined,
  },
  dev: {
    writeToDisk: true,
  },
  server: {
    publicDir: {
      watch: true,
    },
  },
  html: {
    template({ entryName }) {
      const templates = {
        popup: "./src/entries/popup/index.html",
        option: "./src/entries/option/index.html",
      };
      return templates[entryName];
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
});
