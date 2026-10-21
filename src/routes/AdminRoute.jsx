import { Navigate, Outlet } from "react-router-dom";

// store
import useAuthStore from '../store/authStore';

const AdminRoute = () => {


    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;