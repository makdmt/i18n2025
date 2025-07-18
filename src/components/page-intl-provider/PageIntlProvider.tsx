
import { type FC,useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import {Outlet} from "react-router-dom";

interface Props {
    locale: string;
    page: string;
    children: React.ReactNode;
}

export const PageIntlProvider: FC = ({ locale, page, children }: Props) => {
    const [messages, setMessages] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        loadMessages(locale, page).then(setMessages);
    }, [locale, page]);

    async function loadMessages(locale: string, page: string): Promise<Record<string, string>> {
        try {
            const messages = await import(`../locales/${locale}/${page}.json`);
            return messages.default;
        } catch (e) {
            console.warn(`No messages found for locale "${locale}" and page "${page}"`);
            return {};
        }
    }

    if (!messages) return <Outlet/>; // можно показать спиннер

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );

}

