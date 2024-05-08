import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
	plugins: [pluginReact(), pluginSvgr()],
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
		template: "./template/index.html",
	},
});
