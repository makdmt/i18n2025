import { type FC, useCallback, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { DEFAULT_LANG, SUPPORTED_LANGS } from "@/constants";
import { useLocale } from "@/hooks/useLocale";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClose = useCallback(() => {
        setShowMenu(false);
    }, []);

    const handleMenuToggle = useCallback(() => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    }, []);

    const langSelectRef = useClickOutside<HTMLDivElement>(handleMenuClose);

    const [selectedLang, setSelectedLang] = useState(DEFAULT_LANG);
    const { lang } = useLocale();

    useLayoutEffect(() => {
        setSelectedLang(lang);
    })

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const pathWoutLang = pathSegments.slice(1).join('/')

    return (
        <div className={styles.langSelect} ref={langSelectRef}>
            <button
                className={styles.langSelectButton}
                onClick={handleMenuToggle}
                data-testid="lang-select-button"
            >
                <span className={styles.langSelectText}>
                    {LANG_LABEL[selectedLang]}
                </span>

                <EarthIcon />
            </button>

            {showMenu && (
                <ul
                    className={styles.langSelectMenu}
                    data-testid="lang-select-menu"
                >
                    {SUPPORTED_LANGS.map((lang) => {
                        const langName = LANG_LABEL[lang];

                        return (
                            <Link to={`/${lang}/${pathWoutLang}${location.search}${location.hash}`} key={lang}>
                                <li
                                    className={styles.langSelectMenuItem}
                                    key={lang}
                                    onClick={handleMenuClose}
                                >
                                    <span
                                        className={
                                            styles.langSelectMenuItemText
                                        }
                                    >
                                        {langName}
                                    </span>

                                    {lang === selectedLang && <DoneIcon />}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
