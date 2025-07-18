import {useParams} from "react-router-dom";

import {DEFAULT_LOCALE} from "@/constants";

import translations from "../../translations.json";


export function useLocale() {
    const {lang} = useParams();
    const locale = lang || DEFAULT_LOCALE;

    return {locale, translations}
}

