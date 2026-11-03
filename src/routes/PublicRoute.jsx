import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PublicRoute = () => {
    const user = useAuthStore((state) => state.user);

    if (user?.role === "admin" || user?.role === "sub-admin") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;