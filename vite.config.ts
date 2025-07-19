import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { splitTranslationsByPagesPlugin } from "./plugins/splitTranslationsByPagesPlugin";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@formatjs/icu-messageformat-parser',
                replacement: '@formatjs/icu-messageformat-parser/no-parser'
            },
            {
                find: "@",
                replacement: path.resolve(__dirname, "src")
            }],
    },
    plugins: [
        react(),
        svgr({
            include: "**/*.svg",
        }),
        splitTranslationsByPagesPlugin(),
    ],
});
