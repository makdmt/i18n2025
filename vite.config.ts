import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { splitTranslationsByPagesPlugin } from "./plugins/splitTranslationsByPagesPlugin";
import { resolve } from 'path'
import { writeFileSync, readFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
    base: 'i18n2025',
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
        react({
            babel: {
                plugins: [
                    [
                        "formatjs",
                        {
                            "idInterpolationPattern": "[sha512:contenthash:base64:6]",
                            "removeDefaultMessage": true,
                            "ast": true
                        }
                    ]
                ]
            }
        }),
        svgr({
            include: "**/*.svg",
        }),
        splitTranslationsByPagesPlugin(),
        {
            name: 'gh-pages-fallback',
            closeBundle() {
                const indexHtml = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8')
                writeFileSync(resolve(__dirname, 'dist/404.html'), indexHtml)
            }
        }
    ],
});
