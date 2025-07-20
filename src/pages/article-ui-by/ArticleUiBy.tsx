import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { PageIntlProvider } from "@/components/page-intl-provider";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

import styles from "./styles.module.css";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'articleUiBy';

export const ArticleUiBy: FC = () => (
    <PageIntlProvider pageName={PAGE_NAME}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleUiBy.title"
                        defaultMessage="Двухъязычный интерфейс: как учесть русский и белорусский языки в
                    одном продукте"
                        description="заголовок статьи"
                    />

                </h1>

                <p>
                    <FormattedMessage
                        id="articleUiBy.text"
                        defaultMessage="Создание интерфейса для Беларуси — это вызов двуязычия. Продукт
                    должен быть понятен и русскоязычным, и белорусскоязычным
                    пользователям. Мы рассматриваем, как организовать структуру
                    переводов, какие существуют UX-решения для переключения языка и
                    почему важно уделять внимание аутентичности белорусского
                    контента."
                        description="содержание статьи"
                    />

                </p>
            </main>
        </Layout>
    </PageIntlProvider>
);
