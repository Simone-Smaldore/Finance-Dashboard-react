import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { getCurrentUser } from "../services/authService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthContextType["user"]>(null);
    const [csrfToken, setCsrfToken] = useState<AuthContextType["csrfToken"]>(null);

    const refreshUser = async () => {
        try {
            const u = await getCurrentUser();
            setUser(u);
            setCsrfToken(u.csrf_access_token);
        } catch {
            setUser(null);
            setCsrfToken(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, csrfToken, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};
