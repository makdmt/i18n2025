import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { PageIntlProvider } from "@/components/page-intl-provider";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

import styles from "./styles.module.css";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'articleAr';

export const ArticleAr: FC = () => (
    <PageIntlProvider pageName={PAGE_NAME}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleAr.title"
                        defaultMessage="Локализация для арабоязычного мира: RTL, форматы и культурные
                коды"
                        description="заголовок ar статьи"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleAr.text"
                        defaultMessage="Интерфейсы на арабском языке требуют переосмысления привычного
                    порядка элементов: направление письма меняется на RTL. В статье
                    мы объясняем, как грамотно адаптировать верстку, типографику и
                    иконки, чтобы интерфейс выглядел естественно для арабоязычных
                    пользователей, и при этом оставался универсальным."
                        description="Содержимое ar статьи"
                    />

                </p>
            </main>
        </Layout>
    </PageIntlProvider>
);
