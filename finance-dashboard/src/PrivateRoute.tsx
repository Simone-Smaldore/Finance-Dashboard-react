
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import FullscreenSpinner from './components/FullScreenSpinner'
import axios from 'axios'

interface PrivateRouteProps {
    children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
                    withCredentials: true,
                });
                setAuthenticated(res.status === 200);
            } catch {
                setAuthenticated(false);
            }
        }; checkAuth();
    }, []);

    if (authenticated === null) return <FullscreenSpinner />;
    if (!authenticated) return <Navigate to="/login" replace />
    return <>{children}</>
}

export default PrivateRoute
