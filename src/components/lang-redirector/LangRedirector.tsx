import { type FC, useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { LocaleService } from "@/lib/locale-service.ts";
import type { Lang } from "@/types";

export const LangRedirector: FC = () => {

    const { lang } = useParams();
    const location = useLocation();
    const localeService = new LocaleService(lang, location.search);
    const bestSupportedLocale = localeService.findBestSupportedLocale();
    localeService.setBcpTagToLocalStorage(bestSupportedLocale);

    useEffect(() => {
        const htmlElement = document.documentElement;
        const assignedLang = new Intl.Locale(bestSupportedLocale).language as Lang;

        htmlElement.setAttribute('lang', assignedLang);
        htmlElement.setAttribute('dir', assignedLang === 'ar' ? 'rtl' : 'ltr');
        document.title = BRAND_NAMES[assignedLang];

    }, [bestSupportedLocale]);


    if (bestSupportedLocale === lang) return <Outlet />
    else {
        const segments = location.pathname.split('/').filter(Boolean);
        segments[0] = bestSupportedLocale;
        const newPathname = '/' + segments.join('/');

        return <Navigate to={`${newPathname}${location.search}${location.hash}`} replace />
    }
}

