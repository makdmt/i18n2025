import type { FC, PropsWithChildren } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { useLocale } from "@/hooks/useLocale";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

import { LangSelect } from "../lang-select";
import { PageIntlProvider } from "../page-intl-provider";
import styles from "./styles.module.css";
import {COMPANY_NAMES} from "@/constants/brand-names.ts";

const PAGE_NAME: keyof typeof PAGE_TRANSLATION_KEYS = 'layout';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { lang } = useLocale();
    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <Link className={styles.headerBrand} to="/">
                        <BrandLogoIcon />

                        <span className={styles.headerBrandText}>
                            {BRAND_NAMES[lang]}
                        </span>
                    </Link>

                    <LangSelect />
                </div>
            </div>

            <div className={styles.contentContainer}>{children}</div>

            <div className={styles.footer}>
                <div
                    className={styles.footerSocialLinks}
                    data-testid="social-icons"
                >
                    {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                        <a key={index} href="">
                            <Icon />
                        </a>
                    ))}
                </div>

                <span className={styles.footerText}>
                    <PageIntlProvider pageName={PAGE_NAME}>
                        <FormattedMessage
                            id="layout.footer.copyright"
                            defaultMessage='© {yearStart}-{yearEnd}, ООО «<link>{brand}</link>». Все права защищены'
                            description="абзац про отличия свойств"
                            values={{
                                yearStart: <FormattedDate value={new Date('2024')} year='numeric' />,
                                yearEnd: <FormattedDate value={new Date('2025')} year='numeric' />,
                                link: chunks => <a className={styles.textLink} href="">{chunks}</a>,
                                brand: COMPANY_NAMES[lang]
                            }}
                        />
                    </PageIntlProvider>
                </span>
            </div >
        </>
    );
}