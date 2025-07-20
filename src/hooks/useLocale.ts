import { useParams } from "react-router-dom";

import { DEFAULT_LOCALE } from "@/constants";
import type { Lang, Locale } from "@/types";


export function useLocale() {
    const { lang: urllocale } = useParams();
    const locale = urllocale as Locale || DEFAULT_LOCALE;
    const lang = new Intl.Locale(locale).language as Lang;

    return { locale, lang }
}

