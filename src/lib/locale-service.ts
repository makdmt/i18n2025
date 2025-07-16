import {SUPPORTED_LANGS, SUPPORTED_LOCALES, DEFAULT_LANG, DEFAULT_LOCALE} from "@/constants";
import {LANG_COOKIE_NAME} from "@/constants/lang-cookie-name.ts";
import Cookies from 'js-cookie';
import {geoService} from "@/lib/geo-service.ts";

const LANG_LOCALSTORAGE_KEY = 'lang';

interface ILocaleService {
    getCurrentRegion: (queryString: string) => string;
}

export class LocaleService implements ILocaleService {

    constructor(bcpTag: string) {
    }

    isValidBcpTag(bcpTag: string) {
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

    isLangSupported(lang: string) {
        return (SUPPORTED_LANGS as readonly string[]).includes(lang);
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

    getDefaultLocale() {
        return DEFAULT_LOCALE;
    }

    getLocalStorageBcpTag() {
        localStorage.getItem(LANG_LOCALSTORAGE_KEY);
    }

    setBcpTagToLocalStorage(bcpTag: string) {
        localStorage.setItem(LANG_LOCALSTORAGE_KEY, bcpTag);
    }

    getRegionFromIntlLocale(locale: Intl.Locale) {
        return locale.region;
    }

    findBestSupportedLang(preferredLang: string) {

    }

    findBestSupportedLocale(lang: string, region: string) {

    }


    getCurrentUserRegion(queryString: string) {
        return geoService.getCurrentRegion(queryString);
    }


    makeBcpTag(lang: string, region?: string) {
        if (!region) return lang;
        return `${lang}-${region}`;
    }

    isLocaleSupported(locale: Intl.Locale) {
        const validatedLocale = this.makeBcpTag(locale.language, locale.region);
        return (SUPPORTED_LOCALES as readonly string[]).includes(validatedLocale);
    }


    getRegionFromBcpTab(bcpTag: string) {

    }

    isUserRegionSupported(region: string) {
        return
    }


}
