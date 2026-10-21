import {
    MdDashboard, MdGroup, MdSell, MdShoppingCart, MdPerson, MdAnalytics, MdSettings,
    MdInfoOutline, MdNotifications, MdViewCarousel, MdCurrencyRupee,
} from "react-icons/md";

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
        label: "Revenue Management",
        icon: MdCurrencyRupee,
        children: [
            {
                path: "/admin/revenue",
                label: "Overview",
            },
            {
                path: "/admin/transactions",
                label: "Transactions",
            },
            {
                path: "/admin/refunds",
                label: "Refunds",
            },
        ],
    },
    {
        label: "Analytics",
        icon: MdAnalytics,
        path: "/admin/analytics",
    },
    {
        label: "Banners",
        icon: MdViewCarousel,
        path: "/admin/banners",
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
        label: "Profile",
        icon: MdPerson,
        path: "/admin/profile",
    },
    {
        label: "About",
        icon: MdInfoOutline,
        path: "/admin/about",
    },
];

export default menuItems;
