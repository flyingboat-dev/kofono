import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [tailwindcss(), solid()],
    resolve: {
        alias: [
            {
                find: "@",
                // @ts-ignore
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
});
