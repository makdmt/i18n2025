import type {FC} from "react";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";

import {LocaleService} from "@/lib/locale-service.ts";

export const LangRedirector: FC = () => {

    const {lang} = useParams();
    const location = useLocation();
    const localeService = new LocaleService(lang, location.search);
    const bestSupportedLocale = localeService.findBestSupportedLocale();

    const segments = location.pathname.split('/').filter(Boolean);
    segments[0] = bestSupportedLocale;
    const newPathname = '/' + segments.join('/');

    if (bestSupportedLocale === lang) return <Outlet/>
    else {
        localeService.setBcpTagToLocalStorage(bestSupportedLocale);
        return <Navigate to={`${newPathname}${location.search}${location.hash}`} replace/>
    }
}

