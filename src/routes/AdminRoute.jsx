import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AdminRoute = () => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin" && user.role !== "sub-admin") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;