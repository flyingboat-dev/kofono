/**
 * Adapted from https://github.com/corvudev/corvu/blob/b1f36db096867a88ef5b62bec1e46cc0c8e09089/packages/corvu/tsup.config.ts
 */
import { defineConfig, type Options } from "tsup";

function generateConfig(jsx: boolean): Options {
    return {
        target: "esnext",
        platform: "browser",
        format: "esm",
        clean: false,
        dts: !jsx,
        entry: ["src/index.tsx"],
        outDir: "dist/",
        treeshake: { preset: "smallest" },
        replaceNodeEnv: true,
        esbuildOptions(options) {
            if (jsx) {
                options.jsx = "preserve";
            }
            options.chunkNames = "[name]/[hash]";
            // options.drop = ["console", "debugger"];
        },
        outExtension() {
            return jsx ? { js: ".jsx" } : {};
        },
    };
}

export default defineConfig([generateConfig(false), generateConfig(true)]);
