import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const SubAdminRoute = () => {
    const user = useAuthStore(state => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === "sub-admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};

export default SubAdminRoute;