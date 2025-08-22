import { useEffect } from "react";
import { useAuth } from "./auth/useAuth";
import { setCsrfTokenGetter } from "./services/api";


export const AppSetup = () => {
    const { csrfToken } = useAuth();

    useEffect(() => {
        setCsrfTokenGetter(() => csrfToken);
    }, [csrfToken]);

    return null;
};
