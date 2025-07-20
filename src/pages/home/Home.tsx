import { type FC } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import { PageIntlProvider } from "@/components/page-intl-provider";
import { useLocale } from "@/hooks/useLocale";
import type { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";
import type { Locale } from "@/types";

import styles from "./styles.module.css";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'homePage';

const ARTICLES = [
    {
        title: <FormattedMessage id="homePage.rtlArticle.title" defaultMessage="Какие иконки нужно разворачивать для RTL, а какие — нет?" description="заголовок статьи rtl иконок" />,
        description: <FormattedMessage id="homePage.rtlArticle.description" defaultMessage="Не все иконки требуют зеркального отражения при переключении на RTL-языки. Разбираемся, какие иконки зависят от направления текста, а какие — универсальны" description="краткое содержание статьи rtl иконок" />,
        imageUrl: articleRtlIcons,
        articleLink: "article/rtl-icons",
    },
    {
        title: <FormattedMessage id="homePage.cssArticle.title" defaultMessage="Логические CSS-свойства в интерфейсах с поддержкой i18n" description="заголовок статьи css" />,
        description: <FormattedMessage id="homePage.cssArticle.description" defaultMessage="Узнайте, как логические CSS-свойства помогают создавать адаптивные интерфейсы для разных языков и направлений письма — без усложнения кода и дублирования стилей." description="краткое содержание статьи css" />,
        imageUrl: articleCss,
        articleLink: "article/css",
    },
];

const getRegionArticleByLocale = (locale: Locale) => {
    switch (locale) {
        case "ru":
        case "ru-RU":
            return {
                title: <FormattedMessage id="homePage.ruArticle.title" defaultMessage="Как адаптировать веб-приложение под российских пользователей: нюансы локализации" description="заголовок статьи для рус региона" />,
                description: <FormattedMessage id="homePage.ruArticle.description" defaultMessage="Изучаем предпочтения русскоязычных пользователей, числовые и валютные форматы, перевод интерфейса и юридические аспекты (например, закон о персональных данных)" description="краткое содержание статьи для рус региона" />,
                imageUrl: articleL10nRu,
                articleLink: "article/l10n-ru",
            };

        case "ru-BY":
            return {
                title: <FormattedMessage id="homePage.byArticle.title" defaultMessage="Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте" description="заголовок статьи для by региона" />,
                description: <FormattedMessage id="homePage.byArticle.description" defaultMessage="Рассматриваем подходы к реализации двуязычного интерфейса, стандарты перевода и культурные отличия. Особое внимание — контенту на белорусском языке" description="краткое содержание статьи для by региона" />,
                imageUrl: articleUiBy,
                articleLink: "article/ui-by",
            };

        case "ru-KZ":
            return {
                title: <FormattedMessage id="homePage.kzArticle.title" defaultMessage="Русский и казахский: эффективная локализация для Казахстана" description="заголовок статьи для kz региона" />,
                description: <FormattedMessage id="homePage.kzArticle.description" defaultMessage="Разбираем сценарии, когда приложение должно быть доступно сразу на двух языках, и особенности казахской локали (в т.ч. поддержка латиницы и кириллицы, особенности форматов дат)" description="краткое содержание статьи для kz региона" />,
                imageUrl: articleI18nKz,
                articleLink: "article/i18n-kz",
            };

        case "ar":
            return {
                title: <FormattedMessage id="homePage.arArticle.title" defaultMessage="Локализация для арабоязычного мира: RTL, форматы и культурные коды" description="заголовок статьи для ar региона" />,
                description: <FormattedMessage id="homePage.arArticle.description" defaultMessage="От адаптации интерфейса под направление письма справа налево до выбора правильных формулировок — ключевые аспекты локализации для стран Ближнего Востока и Северной Африки" description="краткое содержание статьи для ar региона" />,
                imageUrl: articleAr,
                articleLink: "article/ar",
            };

        case "en":
        default:
            return {
                title: <FormattedMessage id="homePage.enArticle.title" defaultMessage="Локализация для арабоязычного мира: RTL, форматы и культурные коды" description="заголовок статьи для ar региона" />,
                description: <FormattedMessage id="homePage.enArticle.description" defaultMessage="От адаптации интерфейса под направление письма справа налево до выбора правильных формулировок — ключевые аспекты локализации для стран Ближнего Востока и Северной Африки" description="краткое содержание статьи для ar региона" />,
                imageUrl: articleEn,
                articleLink: "article/en",
            };
    }
};

export const Home: FC = () => {

    const { locale } = useLocale();

    const { title, description, imageUrl, articleLink } =
        getRegionArticleByLocale(locale);

    return (
        <PageIntlProvider pageName={PAGE_NAME}>
            <Layout>
                <main className={styles.content}>
                    <section className={styles.hero}>
                        <h1 className={styles.heroTitle}>
                            <FormattedMessage
                                id="homePage.hero.title"
                                defaultMessage="Соединяем цифровые миры на всех языках"
                                description="слоган мероприятия"
                            />
                        </h1>

                        <div className={styles.heroDetails}>
                            <span className={styles.heroDetailsItem}>
                                <FormattedMessage
                                    id="homePage.hero.conference"
                                    defaultMessage="Конференция I&L-{year}"
                                    description="слоган мероприятия"
                                    values={{
                                        year: <FormattedDate value={new Date('2025-08-15')} year='numeric' />
                                    }}
                                />
                            </span>

                            <span className={styles.heroDetailsItem}>
                                <FormattedDate
                                    value={new Date('2025-08-15')}
                                    year="numeric"
                                    month="long"
                                    day="numeric"
                                />
                            </span>

                            <span className={styles.heroDetailsItem}>
                                <FormattedMessage
                                    id="homePage.hero.location"
                                    defaultMessage="Москва, Россия"
                                    description="место проведения мероприятия"
                                />
                            </span>

                            <span className={styles.heroDetailsItem}>
                                <FormattedMessage
                                    id="homePage.hero.price"
                                    defaultMessage="{price} билет"
                                    description="стоимость билета"
                                    values={{
                                        price: <FormattedNumber
                                            value={35000}
                                            style="currency"
                                            currency="RUB"
                                            minimumFractionDigits={2}
                                            maximumFractionDigits={2}
                                        />
                                    }}
                                />
                            </span>
                        </div>

                        <a className={styles.heroRegister} href="">
                            <FormattedMessage
                                id="homePage.hero.register"
                                defaultMessage="Зарегистрироваться"
                                description="кнопка регистрации"
                            />
                        </a>
                    </section>

                    <section className={styles.regionArticle}>
                        <h2 className={styles.regionArticleTitle}>
                            <FormattedMessage
                                id="homePage.regionArticle.title"
                                defaultMessage="Актуально для вашего региона"
                                description="заголовок раздела локальных новостей"
                            />
                        </h2>

                        <Link className={styles.articleCard} to={articleLink}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{title}</h3>

                                <p className={styles.cardDescription}>
                                    {description}
                                </p>

                                <span className={styles.cardRead}>
                                    <FormattedMessage
                                        id="homePage.article.read"
                                        defaultMessage="Читать"
                                        description="кнопка для перехода к полному тексту статьи"
                                    />
                                </span>
                            </div>

                            <img className={styles.cardImage} src={imageUrl} />
                        </Link>
                    </section>

                    <section className={styles.articles}>
                        <h2 className={styles.articlesTitle}>
                            <FormattedMessage
                                id="homePage.articles.title"
                                defaultMessage="Статьи"
                                description="заголовок разела со списком статей"
                            />
                        </h2>

                        {ARTICLES.length > 0 && (
                            <p className={styles.articlesDescription}>
                                <FormattedMessage
                                    id="homePage.articles.description"
                                    defaultMessage="Всего {count, plural, one {# статья} few {# статьи} many {# статей} other {# статьи}}"
                                    description="количество статей для чтения в списке"
                                    values={{
                                        count: ARTICLES.length
                                    }}
                                />
                            </p>
                        )}

                        <div className={styles.articlesList}>
                            {ARTICLES.map(
                                (
                                    { title, description, imageUrl, articleLink },
                                    index
                                ) => (
                                    <Link
                                        key={index}
                                        className={styles.articleCard}
                                        to={articleLink}
                                    >
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardTitle}>
                                                {title}
                                            </h3>

                                            <p className={styles.cardDescription}>
                                                {description}
                                            </p>

                                            <span className={styles.cardRead}>
                                                <FormattedMessage
                                                    id="homePage.article.read"
                                                    defaultMessage="Читать"
                                                    description="кнопка для перехода к полному тексту статьи"
                                                />
                                            </span>
                                        </div>

                                        <img
                                            className={styles.cardImage}
                                            src={imageUrl}
                                        />
                                    </Link>
                                )
                            )}
                        </div>
                    </section>
                </main>
            </Layout>
        </PageIntlProvider>
    );
};
