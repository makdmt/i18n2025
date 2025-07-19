
import { type FC, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { useLocale } from '@/hooks/useLocale';

import { Loader } from '../loader';

async function loadPageTranslates(locale: string, page: string): Promise<Record<string, string>> {
    try {
        const messages = await import(`@/translations/locales/${locale}/${page}.json`);
        return messages.default;
    } catch {
        console.warn(`No translates found for locale "${locale}" and page "${page}"`);
        return {};
    }
}
interface Props {
    pageName: string;
    children: React.ReactNode;
}

export const PageIntlProvider: FC<Props> = ({ pageName, children }) => {

    const { lang, locale } = useLocale();
    const [messages, setMessages] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        loadPageTranslates(lang, pageName).then(setMessages);
    }, [lang, locale, pageName]);


    if (!messages) return <Loader />

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );

}
