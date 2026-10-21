import { Navigate, Outlet } from "react-router-dom";

// store
import useAuthStore from '../store/authStore';

const PublicRoute = () => {

    const { user } = useAuthStore();

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