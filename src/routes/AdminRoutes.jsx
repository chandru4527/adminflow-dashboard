import { Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import CustomerManege from "../Pages/user management/CustomerManege";
import ChefManagement from "../Pages/user management/ChefManage";
import ApproveChef from "../Pages/approve/ApproveChef";
import Subcription from "../Pages/Subscription";
import UpcomingBooking from "../Pages/booking/UpcomingBooking";
import OngoingBooking from "../Pages/booking/OngoingBooking";
import CompletedBooking from "../Pages/booking/CompletedBooking";
import OneTimeRegister from "../Pages/revenue management/OneTimeRegister";
import Withdrawals from '../Pages/revenue management/Withdrawals'








const adminPages = [
    {
        path: "dashboard",
        element: <Dashboard />,
        permission: "dashboard",
        title: "Dashboard",
    },
    {
        path: "customer",
        element: <CustomerManege />,
        permission: "customer",
        title: "Customers",
    },
    {
        path: "chef",
        element: <ChefManagement />,
        permission: "chef",
        title: "Chef",
    },
    {
        path: "chef-approve",
        element: <ApproveChef />,
        permission: "chef-approve",
        title: "Chef Approve"
    },
    {
        path: "subscription",
        element: <Subcription />,
        permission: "subscription",
        title: "Subscription"
    },
    {
        path:'upcoming-book',
        element:<UpcomingBooking />,
        permission:'upcoming-book',
        title:'Upcoming Bookings'
    },
    {
        path:'ongoing-book',
        element:<OngoingBooking />,
        permission:'ongoing-book',
        title:'Ongoing Bookings'
    },
    {
        path: "completed-booking",
        element:<CompletedBooking />,
        permission:'completed-booking',
        title:'Completed Bookings'
    },
    {
        path:'one-time-registeration',
        element:<OneTimeRegister />,
        permission:'one-time-registeration',
        title:'One Time Registeration'
    },
    {
        path:'withdrawals',
        element:<Withdrawals/>,
        permission:'withdrawals',
        title:'Withdrawals management'
    }
];

// const adminRoutes = {
//   path: "/admin",
//   element: <AdminRoute />,
//   children: [
//     {
//       element: <AdminLayout />,
//       children: [
//         { index: true, element: <Navigate to="dashboard" replace /> },

//         ...adminPages.map((page) => ({
//           path: page.path,
//           handle: { title: page.title },
//           element: (
//             <PermissionRoute permission={page.permission}>
//               {page.element}
//             </PermissionRoute>
//           ),
//         })),
//       ],
//     },
//   ],
// };

export default adminRoutes;