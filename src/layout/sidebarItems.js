import { MdDashboard, MdGroup, MdSell, MdShoppingCart, MdPerson, MdAnalytics, MdSettings, MdInfoOutline, MdNotifications, } from "react-icons/md";

const menuItems = [
    {
        label: "Dashboard",
        icon: MdDashboard,
        path: "/admin/dashboard",
    },
    {
        label: "User Management",
        icon: MdGroup,
        children: [
            {
                path: "/admin/users",
                label: "Users",
            },
        ],
    },
    {
        label: "Products",
        icon: MdSell,
        children: [
            {
                path: "/admin/products",
                label: "All Products",
            },
            {
                path: "/admin/categories",
                label: "Categories",
            },
            {
                path: "/admin/reviews",
                label: "Reviews",
            },
        ],
    },
    {
        label: "Orders",
        icon: MdShoppingCart,
        path: "/admin/orders",
    },
    {
        label: "Analytics",
        icon: MdAnalytics,
        path: "/admin/analytics",
    },
    {
        label: "Profile",
        icon: MdPerson,
        path: "/admin/profile",
    },
    {
        label: "Notifications",
        icon: MdNotifications,
        path: "/admin/notifications",
    },
    {
        label: "Settings",
        icon: MdSettings,
        path: "/admin/settings",
    },
    {
        label: "About",
        icon: MdInfoOutline,
        path: "/admin/about",
    },
];

export default menuItems;
