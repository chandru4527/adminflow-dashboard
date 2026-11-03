import { createBrowserRouter, Navigate } from "react-router-dom";

// protect routes
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";
import SubAdminRoute from './SubAdminRoute';

// layout
import AdminLayout from "../layout/AdminLayout";

// auth page
import Login from "../pages/Login";

// pages
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import SubAdmins from "../pages/SubAdmins";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Revenue from "../pages/Revenue";
import Transactions from "../pages/Transactions";
import Refunds from "../pages/Refunds";
import Banners from "../pages/Banners";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import About from "../pages/About";

import Masters from "../pages/Masters";
import Categories from "../pages/Categories";

// not found
import NotFound from "../pages/notFound/NotFound";

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
                        path: "sub-admins",
                        element: <SubAdminRoute />,
                        children: [
                            {
                                index: true,
                                element: <SubAdmins />,
                                handle: {
                                    title: "Users Management",
                                },
                            }
                        ]
                    },
                    {
                        path: "products",
                        element: <Products />,
                        handle: {
                            title: "Product Management",
                        },
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                        handle: {
                            title: "Orders Management",
                        },
                    },
                    {
                        path: "revenue",
                        element: <Revenue />,
                        handle: {
                            title: "Revenue Management",
                        },
                    },
                    {
                        path: "transactions",
                        element: <Transactions />,
                        handle: {
                            title: "Revenue Management",
                        },
                    },
                    {
                        path: "refunds",
                        element: <Refunds />,
                        handle: {
                            title: "Revenue Management",
                        },
                    },
                    {
                        path: "masters",
                        element: <Masters />,
                        children: [
                            { index: true, element: <Navigate to="categories" replace /> },
                            {
                                path: "categories",
                                element: <Categories />,
                                handle: {
                                    title: "Masters",
                                },
                            },
                        ],
                    },
                    {
                        path: "banners",
                        element: <Banners />,
                        handle: {
                            title: "Banner Management",
                        },
                    },
                    {
                        path: "notifications",
                        element: <Notifications />,
                        handle: {
                            title: "Notifications Management",
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