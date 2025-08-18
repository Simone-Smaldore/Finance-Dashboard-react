
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import FullscreenSpinner from './components/FullScreenSpinner'
import type { User } from './model/User';
import { getCurrentUser } from './services/authService';

interface PrivateRouteProps {
    children: (user: User) => React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await getCurrentUser()
                setUser(currentUser)
                setAuthenticated(true)
            } catch {
                setAuthenticated(false)
            }

        }; checkAuth();
    }, []);

    if (authenticated === null) return <FullscreenSpinner />;
    if (!authenticated) return <Navigate to="/login" replace />
    return <>{children(user!)}</>;
}

export default PrivateRoute
