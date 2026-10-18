import { createBrowserRouter, Navigate } from "react-router-dom";

// protect routes
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";

// layout
import AdminLayout from "../layout/AdminLayout";

// auth page
import Login from "../pages/Login";

// pages
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Profile from "../pages/Profile";

// not found
import NotFound from "../pages/notFound/NotFound";
import Settings from "../pages/Settings";
import About from "../pages/About";

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
                    {
                        path: "users",
                        element: <Users />,
                        handle: {
                            title: "Users Management",
                        },
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                        handle: {
                            title: "Profile",
                        },
                    },
                    {
                        path: "settings",
                        element: <Settings />,
                        handle: {
                            title: "Settings",
                        },
                    },
                    {
                        path: "about",
                        element: <About />,
                        handle: {
                            title: "About",
                        },
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default Routers;