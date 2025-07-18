import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

import { SUPPORTED_LANGS } from "../src/constants";
import { PAGE_TRANSLATION_KEYS } from "../src/page-translation-keys";
import translations from '../translations.json';

export function splitTranslationsByPagesPlugin(): Plugin {
    return {
        name: 'generate-locales',
        async buildStart() {
            // Здесь твоя логика генерации файлов локализации

            const outputDir = path.resolve(process.cwd(), 'src/translations/locales');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, {recursive: true});
            }

            const locales = SUPPORTED_LANGS;
            const pageKeys = PAGE_TRANSLATION_KEYS;


            for (const locale of locales) {
                fs.mkdirSync(path.join(outputDir, locale), {recursive: true});
            }

            for (const [page, keys] of Object.entries(pageKeys)) {
                for (const locale of locales) {
                    const pageTranslations: Record<string, string> = {};

                    for (const key of keys) {
                        //@ts-expect-error index error
                        const value = translations[key]?.[locale];
                        if (value) {
                            pageTranslations[key] = value;
                        }
                    }

                    const filePath = path.join(outputDir, locale, `${page}.json`);
                    fs.writeFileSync(filePath, JSON.stringify(pageTranslations, null, 2), 'utf-8');
                    console.log(`✅ Generated: ${filePath}`);
                }
            }
        }
    }
}