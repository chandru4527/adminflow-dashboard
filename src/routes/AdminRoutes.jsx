import { Navigate } from "react-router-dom";

import Dashboard from "../Pages/dashboard/Dashboard";
import CustomerManege from "../Pages/user management/CustomerManege";
import ChefManagement from "../Pages/user management/ChefManage";
import ApproveChef from "../Pages/approve/ApproveChef";
import Subcription from "../Pages/Subscription";
import UpcomingBooking from "../Pages/booking/UpcomingBooking";
import OngoingBooking from "../Pages/booking/OngoingBooking";
import CompletedBooking from "../Pages/booking/CompletedBooking";
import OneTimeRegister from "../Pages/revenue management/OneTimeRegister";
import Withdrawals from "../Pages/revenue management/Withdrawals";
import Refunds from '../Pages/revenue management/Refunds'
import FoodDonation from '../Pages/FoodDonation'
import Services from '../Pages/Services'
import AdminSettings from '../Pages/AdminSettings'

// permission route
import PermissionRoute from '../protected routes/PermissionRoute'
import Error from "../components/Error";
import AdminRoute from "../protected routes/AdminRoute";
import AdminLayout from '../layout/AdminLayout'


const adminPages = [
  {
    path: "dashboard",
    element: <Dashboard />,
    permission: "dashboard",
    title: "Dashboard",
  },
  {
    path: "customers",
    element: <CustomerManege />,
    permission: "customer",
    title: "Customers",
  },
  {
    path: "chefs",
    element: <ChefManagement />,
    permission: "chef",
    title: "Chef",
  },
  {
    path: "chef-approve",
    element: <ApproveChef />,
    permission: "chef-approve",
    title: "Chef Approve",
  },
  {
    path: "subscription",
    element: <Subcription />,
    permission: "subscription",
    title: "Subscription",
  },
  {
    path: "upcoming-bookings",
    element: <UpcomingBooking />,
    permission: "upcoming-book",
    title: "Upcoming Bookings",
  },
  {
    path: "ongoing-bookings",
    element: <OngoingBooking />,
    permission: "ongoing-book",
    title: "Ongoing Bookings",
  },
  {
    path: "completed-booking",
    element: <CompletedBooking />,
    permission: "completed-booking",
    title: "Completed Bookings",
  },
  {
    path: "one-time-registeration",
    element: <OneTimeRegister />,
    permission: "one-time-registeration",
    title: "One Time Registration",
  },
  {
    path: "withdrawals",
    element: <Withdrawals />,
    permission: "withdrawals",
    title: "Withdrawals",
  },
  {
    path: "refunds",
    element: <Refunds />,
    permission: "refunds",
    title: "refunds",
  },
  {
    path: "food-donation",
    element: <FoodDonation />,
    permission: "food-donation",
    title: "food donation management",
  },
  {
    path: "services",
    element: <Services />,
    permission: "services",
    title: "services",
  },
  {
    path: "settings",
    element: <AdminSettings />,
    permission: "admin-settings",
    title: "admin settings",
  },
];

const adminRoutes_pages = {
  path: "/admin",
  element: <AdminRoute />,
  errorElement: <Error />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },

        ...adminPages.map((page) => ({
          path: page.path,
          handle: { title: page.title },
          element: (
            <PermissionRoute permission={page.permission}>
              {page.element}
            </PermissionRoute>
          ),
        })),
      ],
    },
  ],
};

export default adminRoutes_pages;