
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import FullscreenSpinner from './components/FullScreenSpinner'
import { getCurrentUser } from './services/authService';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getCurrentUser()
                setAuthenticated(true)
            } catch {
                setAuthenticated(false)
            }

        }; checkAuth();
    }, []);

    if (authenticated === null) return <FullscreenSpinner />;
    if (!authenticated) return <Navigate to="/login" replace />
    return <>{children}</>;
}

export default PrivateRoute
