import { createBrowserRouter, Navigate } from 'react-router-dom'

// protect routers
import PublicRoute from '../protected routes/PublicRoute'
import AdminRoute from '../protected routes/AdminRoute'

// layout
import AdminLayout from '../layout/adminLayout'

// import pages
import AdminLogin from '../pages/authpage/AdminLogin'
import Dashboard from '../Pages/dashboard/Dashboard'
import AdminSettings from '../Pages/AdminSettings'
import ErrorPage from '../components/ErrorPage'
import Error from '../components/Error'

import adminRoutes_pages from './AdminRoutes'


const router = createBrowserRouter([

    // Initial browser load
    {
        path: "/",
        element: <Navigate to="/admin/login" replace />,
    },

    // login page prevent
    {
        path: '/admin/login',
        element: <PublicRoute />,
        children: [
            { index: true, element: <AdminLogin /> }
        ]
    },

    adminRoutes_pages,



    // admin protect and element
    // {
    //     path: '/admin',
    //     element: <AdminRoute />,
    //     errorElement: <Error />,
    //     children: [
    //         {
    //             element: <AdminLayout />,
    //             children: [
    //                 { index: true, element: <Navigate to='dashboard' replace /> },
    //                 { path: 'dashboard', element: <Dashboard />, handle: { title: 'dashboard' } },
    //                 { path: 'settings', element: <AdminSettings />, handle: { title: 'settings' } }
    //             ]
    //         }
    //     ]
    // },

    // error page
    {
        path: '*', element: <ErrorPage />
    }
])

export default router
