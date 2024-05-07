import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
	plugins: [pluginReact(), pluginSvgr()],
	dev: {
		writeToDisk: true,
	},
	server: {
		publicDir: {
			watch: true,
		},
	},
});
