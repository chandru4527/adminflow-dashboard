import { Navigate, Outlet } from "react-router-dom";

// utils
import { getAuth } from '../utils/auth';

const AdminRoute = () => {
    

    const user = getAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;