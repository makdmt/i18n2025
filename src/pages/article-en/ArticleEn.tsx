import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { PageIntlProvider } from "@/components/page-intl-provider";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

import styles from "./styles.module.css";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'articleEn';

export const ArticleEn: FC = () => (
    <PageIntlProvider pageName={PAGE_NAME}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleEn.title"
                        defaultMessage="Проектирование для глобальной аудитории: английский как
                универсальный язык"
                        description="заголовок статьи"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleEn.text"
                        defaultMessage="Английский язык часто используется в интерфейсах как
                    универсальный, особенно на этапе MVP или при работе на
                    международный рынок. Мы делимся рекомендациями, как писать
                    интерфейсные тексты, которые останутся понятными, нейтральными и
                    легко поддающимися переводу в будущем."
                        description="содержание статьи"
                    />

                </p>
            </main>
        </Layout>
    </PageIntlProvider>
);
