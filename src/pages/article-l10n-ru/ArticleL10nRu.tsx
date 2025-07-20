import { type FC } from "react";
import { FormattedDate,FormattedMessage, FormattedNumber } from "react-intl";

import { Layout } from "@/components";
import { PageIntlProvider } from "@/components/page-intl-provider";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

import styles from "./styles.module.css";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'articleL10nRu';

export const ArticleL10nRu: FC = () => (
    <PageIntlProvider pageName={PAGE_NAME}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleL10nRu.title"
                        defaultMessage="Как адаптировать веб-приложение под российских пользователей:
                    нюансы локализации"
                        description="заголовок статьи"
                    />

                </h1>

                <p>
                    <FormattedMessage
                        id="articleL10nRu.text1"
                        defaultMessage="Российская аудитория — одна из крупнейших в Восточной Европе, с более чем {usersCount} интернет-пользователей. При этом около {percent} предпочитают сайты на русском языке. При локализации важно учитывать форматы чисел (например, десятичный разделитель — запятая), валют и дат."
                        description="содержание статьи"
                        values={{
                            usersCount: <FormattedNumber value={98000000} />,
                            percent: <FormattedNumber value={.78} style="percent" />
                        }}
                    />

                </p>

                <p>
                    <FormattedMessage
                        id="articleL10nRu.text2"
                        defaultMessage="Также стоит обращать внимание на юридические аспекты: закон о персональных данных требует хранения информации на серверах внутри страны. Многие компании перешли на соответствие этому требованию ещё с {date}"
                        description="содержание статьи"
                        values={{
                            date: <FormattedDate value={new Date('2015-09-01')} year="numeric" month="long" day="numeric" />
                        }}
                    />
                </p>
            </main>
        </Layout>
    </PageIntlProvider>
);
