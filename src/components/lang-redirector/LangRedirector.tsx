import { type FC, useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { LocaleService } from "@/lib/locale-service.ts";

export const LangRedirector: FC = () => {

    const { lang } = useParams();
    const location = useLocation();
    const localeService = new LocaleService(lang, location.search);
    const bestSupportedLocale = localeService.findBestSupportedLocale();
    localeService.setBcpTagToLocalStorage(bestSupportedLocale);

    useEffect(() => {
        const htmlElement = document.documentElement;
        const assignedLang = new Intl.Locale(bestSupportedLocale).language;

        htmlElement.setAttribute('lang', assignedLang);
        htmlElement.setAttribute('dir', assignedLang === 'ar' ? 'rtl' : 'ltr');
    }, [bestSupportedLocale]);


    if (bestSupportedLocale === lang) return <Outlet />
    else {
        const segments = location.pathname.split('/').filter(Boolean);
        segments[0] = bestSupportedLocale;
        const newPathname = '/' + segments.join('/');

        return <Navigate to={`${newPathname}${location.search}${location.hash}`} replace />
    }
}

