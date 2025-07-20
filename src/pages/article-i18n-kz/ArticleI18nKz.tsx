import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { PageIntlProvider } from "@/components/page-intl-provider";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

import styles from "./styles.module.css";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'articleI18nKz';

export const ArticleI18nKz: FC = () => (
    <PageIntlProvider pageName={PAGE_NAME}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleI18nKz.title"
                        defaultMessage="Русский и казахский: эффективная локализация для Казахстана"
                        description="заголовок статьи"
                    />
                </h1>
                <p>
                    <FormattedMessage
                        id="articleI18nKz.text"
                        defaultMessage="Казахстан — уникальный рынок, где используются сразу два языка:
                    русский и казахский. Причём казахский может быть как на
                    кириллице, так и на латинице. Мы рассказываем, как обеспечить
                    корректную поддержку обоих языков, с учётом форматов дат,
                    переводов, и переключения языка в интерфейсе."
                        description="содержимое статьи"
                    />
                </p>
            </main>
        </Layout>
    </PageIntlProvider>
);
