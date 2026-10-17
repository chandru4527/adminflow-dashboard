import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/admin" replace />,
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <Login />,
                handle: {
                    title: "Login",
                },
            },
        ],
    },
    {
        element: <AdminRoute />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="dashboard" replace />,
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                        handle: {
                            title: "Dashboard",
                        },
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default Routers;