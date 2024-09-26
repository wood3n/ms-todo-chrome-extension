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
        library: {
          type: "umd",
        },
        runtime: false,
      },
    },
  },
  output: {
    filename: {
      js: "[name].[contenthash:8].js",
      css: "[name].[contenthash:8].css",
      svg: "[name].[contenthash:8].svg",
      font: "[name].[contenthash:8][ext]",
      image: "[name].[contenthash:8][ext]",
      media: "[name].[contenthash:8][ext]",
    },
    copy: process.env.NODE_ENV === "development" ? [{ from: "./public", to: "" }] : undefined,
  },
  dev: {
    hmr: false,
    liveReload: true,
    writeToDisk: true,
  },
  server: {
    publicDir: {
      watch: true,
    },
  },
  tools: {
    htmlPlugin: false,
    rspack: (config, { rspack }) => {
      config.plugins?.push(
        new rspack.HtmlRspackPlugin({
          template: "./src/entries/popup/index.html",
          filename: "popup.html",
          chunks: ["popup"],
        }),
        new rspack.HtmlRspackPlugin({
          template: "./src/entries/option/index.html",
          filename: "option.html",
          chunks: ["option"],
        }),
      );
      return config;
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
});
