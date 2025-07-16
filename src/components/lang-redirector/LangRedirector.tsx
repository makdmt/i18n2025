import type { FC } from "react";
import { Navigate, Outlet,useParams } from "react-router-dom";

export const LangRedirector: FC = () => {

    const { lang } = useParams();
    console.log(lang);

    return <Outlet />;
}
