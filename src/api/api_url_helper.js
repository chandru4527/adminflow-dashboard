// src/api/endpoints.js

const endpoints = {
    auth: {
        login: "v1/auth/admin-login",
    },

    users: {
        list: "v1/admin/allUsers",
        all: "v1/users/all-users",
        updateStatus: "v1/users/user/update-profile",
    },

    media: {
        upload: "v1/media/upload",
    },

    verification: {
        pendingChefs: "v1/users/all-users",
        approve: "v1/admin/approve",
        reject: "v1/admin/reject",
        list: "v1/admin/verification",
        assignArtist: "v1/admin/assignArtist",
        availableArtists: "v1/admin/availableArtists",
    },

    bookings: {
        all: "v1/bookings/all-bookings",
        client: "v1/bookings/client",
        user: "v1/bookings/user",
    },

    coupons: {
        list: "v1/coupons/allCoupons",
        create: "v1/coupons/create",
        update: "v1/coupons/update",
        delete: "v1/coupons/delete",
    },

    payments: {
        records: "v1/payments/paymentDetails",
        search: "v1/payments/client?",
        refund: "v1/payments/refundPayment",
    },

    dashboard: {
        stats: "v1/admin/dashboard/stats",
        overview: "v1/admin/dashboard",
    },

    services: {
        create: "v1/services",
        list: "v1/services/all-services",
        update: "v1/services/update",
        registrationRecords: "v1/services/registration-records",
    },

    categories: {
        list: "v1/categories",
        active: "v1/categories/active",
    },

    adminSettings: {
        add: "v1/adminSettings/addSettings",
        list: "v1/adminSettings/getAll",
        delete: "v1/adminSettings",
    },

    withdrawals: {
        list: "v1/withdraws/all-withdraws",
        update: "v1/withdraws/update",
    },

    subscriptions: {
        list: "v1/plans",
        add: "v1/plans/add-plan",
        update: "v1/plans/add-chef",
        delete: "v1/plans/delete",
        toggleStatus: "v1/plans/toggle-status",
    },

    donations: {
        list: "v1/donations/all-donations",
    },
};

export default endpoints;