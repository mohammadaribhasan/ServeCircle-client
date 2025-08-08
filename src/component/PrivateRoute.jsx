import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { valueConText } from '../rootlayout/RootLayout';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(valueConText);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
                Checking authentication...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/loginfirst" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
