import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {SUPPORTED_LANGS} from '../constants/index.js';

import translations from '../../translations.json' assert { type: 'json' };
import {PAGE_TRANSLATION_KEYS} from '../page-translation-keys.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, './locales');

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
