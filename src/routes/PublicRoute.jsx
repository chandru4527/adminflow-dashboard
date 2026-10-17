import { Navigate, Outlet } from "react-router-dom";

// utils
import { getAuth } from '../utils/auth';

const PublicRoute = () => {

    const user = getAuth();

    // Not logged in
    if (!user) {
        return <Outlet />;
    }

    // Admin
    if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />

};

export default PublicRoute;