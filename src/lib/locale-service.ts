import Cookies from 'js-cookie';

import {DEFAULT_LANG, DEFAULT_LOCALE, SUPPORTED_LANGS, SUPPORTED_LOCALES} from "@/constants";
import {LANG_COOKIE_NAME} from "@/constants/lang-cookie-name.ts";
import {geoService} from "@/lib/geo-service.ts";
import type {Lang} from "@/types";

const LANG_LOCALSTORAGE_KEY = 'lang';

export class LocaleService {
    requestedLocale: string;
    queryString: string;

    constructor(bcpTag: string, queryString: string) {
        this.queryString = queryString;
        if (this.isValidBcpTag(bcpTag)) {
            this.requestedLocale = bcpTag;
            return;
        } else {
            let savedLocale: string | null | undefined = this.getLocalStorageBcpTag();
            if (!this.isValidBcpTag(savedLocale)) savedLocale = this.getCookieBcpTag();
            if (!this.isValidBcpTag(savedLocale)) savedLocale = this.getBrowserBcpTag();
            if (!savedLocale) savedLocale = this.getDefaultLocale();
            this.requestedLocale = savedLocale;
        }
    }

    setBestSupportedLocale() {
        const locale = this.findBestSupportedLocale();
        this.setBcpTagToLocalStorage(locale);
        return locale;
    }

    isValidBcpTag(bcpTag: unknown): bcpTag is string {
        if (typeof bcpTag !== 'string' || !bcpTag) return false;
        try {
            new Intl.Locale(bcpTag);
            return true;
        } catch {
            return false;
        }
    }

    getIntlLocaleFromBcpTag(bcpTag: string) {
        return new Intl.Locale(bcpTag);
    }

    getLangFromIntlLocale(locale: Intl.Locale) {
        return locale.language;
    }

    isLangValidAndSupported(bcpTag: unknown): bcpTag is Lang {
        if (!this.isValidBcpTag(bcpTag)) return false;
        const locale = this.getIntlLocaleFromBcpTag(bcpTag);
        const validatedLang = this.getLangFromIntlLocale(locale);
        return (SUPPORTED_LANGS as readonly string[]).includes(validatedLang);
    }

    getCookieBcpTag() {
        return Cookies.get(LANG_COOKIE_NAME);
    }

    getBrowserBcpTag() {
        return navigator.language;
    }

    getDefaultLang() {
        return DEFAULT_LANG;
    }

    findBestSupportedLang() {
        let requestedLocale: string | null | undefined = this.requestedLocale;
        if (!this.isLangValidAndSupported(requestedLocale)) requestedLocale = this.getCookieBcpTag();
        if (!this.isLangValidAndSupported(requestedLocale)) requestedLocale = this.getBrowserBcpTag();
        if (!this.isLangValidAndSupported(requestedLocale)) requestedLocale = this.getDefaultLang();
        return requestedLocale as Lang;
    }

    getLocalStorageBcpTag() {
        return localStorage.getItem(LANG_LOCALSTORAGE_KEY);
    }

    setBcpTagToLocalStorage(bcpTag: string) {
        localStorage.setItem(LANG_LOCALSTORAGE_KEY, bcpTag);
    }

    getRegionFromIntlLocale(locale: Intl.Locale) {
        return locale.region;
    }

    getCurrentUserRegion() {
        return geoService.getCurrentRegion(this.queryString);
    }

    findLocaleByRegionAndSupportedLang(lang: Lang, region: string) {
        const supportedLangRegionLocale = SUPPORTED_LOCALES.find(locale => {
            const intlLocale = this.getIntlLocaleFromBcpTag(locale);
            const localeLang = this.getLangFromIntlLocale(intlLocale);
            const localeRegion = this.getRegionFromIntlLocale(intlLocale);
            return localeLang === lang && localeRegion === region;
        });

        if (supportedLangRegionLocale) return supportedLangRegionLocale;
        else return lang;
    }

    findBestSupportedLocale() {
        const lang = this.findBestSupportedLang();
        const region = this.getCurrentUserRegion();
        return this.findLocaleByRegionAndSupportedLang(lang, region);
    }

    getDefaultLocale() {
        return DEFAULT_LOCALE;
    }
}
