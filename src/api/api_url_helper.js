export const API_ENDPOINTS = {
  
  adminLogin: "v1/auth/admin-login",

  users: "v1/admin/allUsers",
  usersRole: "v1/users/all-users",

  mediaUpload: "v1/media/upload",

  userStatusUpdate: "v1/users/user/update-profile",

  // Artist/Chef Approval
  approveChef: "v1/users/all-users",
  approveDoc: "v1/admin/approve",
  approveDocReject: "v1/admin/reject",
  adminVerification: "v1/admin/verification",

  // Subscription
  subscriptionList: "v1/plans",
  subscriptionListStatus: "v1/plans/toggle-status",
  subscriptionAdd: "v1/plans/add-plan",
  subscriptionUpdate: "v1/plans/add-chef",
  subscriptionDelete: "v1/plans/delete",

  // Registration
  oneTimeRegistration: "v1/services/registration-records",

  // Donation
  donationList: "v1/donations/all-donations",

  // Dashboard
  dashboard: "v1/admin/dashboard",

  // Bookings
  allBookings: "v1/bookings/all-bookings",
  refundBookings: "v1/payments/refundPayment",

  // Services
  services: "v1/services/all-services",
  serviceUpdate: "v1/services/update",

  // Admin Settings
  adminSettings: "v1/adminSettings/getAll",
  adminSettingsDelete: "v1/adminSettings",
  adminSettingsAdd: 'v1/adminSettings/addSettings',

  // Withdrawals
  withdrawals: "v1/withdraws/all-withdraws",
};