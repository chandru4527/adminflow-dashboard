import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post, put, patch, deletes, postFormData } from "../api/axios";
import { API_ENDPOINTS } from '../api/api_url_helper'

// admin login
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await post(API_ENDPOINTS.adminLogin, payload)
    }
  })
}

// dashboard
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => get(API_ENDPOINTS.dashboard),
  });
}

// user manage
export const useUserDetails = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["userManage", page, limit],
    queryFn: () =>
      get(`${API_ENDPOINTS.usersRole}?role=customer&page=${page}&limit=${limit}`),
    placeholderData: (previousData) => previousData,
  });
};

// update user status
export const useUpdateCustomerStatus = () => {
  return useMutation({
    mutationFn: async ({ id, activeStatus }) => {
      return await patch(`${API_ENDPOINTS.userStatusUpdate}/${id}?role=customer`, {
        userId: id,
        activeStatus,
      });
    },
  });
}

// chef manage
export const useChefDetails = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["chefManage", page, limit],
    queryFn: () =>
      get(`${API_ENDPOINTS.usersRole}?role=chef&verificationStatus=approved&page=${page}&limit=${limit}`),
    placeholderData: (previousData) => previousData,
  });
};

// ubdatae chef status
export const useUpdateChefStatus = () => {
  return useMutation({
    mutationFn: async ({ id, activeStatus }) => {
      return await patch(`${API_ENDPOINTS.userStatusUpdate}/${id}?role=chef`, {
        userId: id,
        activeStatus,
      });
    },
  });
}

// aprovels
export const useChefApprove = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["chefAprove", page, limit],
    queryFn: () =>
      get(`${APPROVECHEF}?page=${page}&role=chef&verificationStatus=pending&limit=${limit}`),
    placeholderData: (previousData) => previousData,
  });
};

// services 
export const useServices = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["service", page, limit],
    queryFn: () =>
      get(`${API_ENDPOINTS.services}?page=${page}&limit=${limit}`),
    placeholderData: (previousData) => previousData,
  });
};

// ubdate base price service
export const useUpdateBasePrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, basePrice }) =>
      patch(`${API_ENDPOINTS.serviceUpdate}/${id}`, { basePrice }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chefs"] });
    },
  });
};

// food donation
export const useFoodDonation = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["food-donation", page, limit],
    queryFn: () =>
      get(`${API_ENDPOINTS.donationList}`),
    placeholderData: (previousData) => previousData,
  });
};

// bookings
export const useBookings = () => {
  return useQuery({
    queryKey: ['upcoming-bookings'],
    queryFn: () => get(API_ENDPOINTS.allBookings)
  })
}

// withdrawals
export const useWithdrawals = () => {
  return useQuery({
    queryKey: ['withdrawals'],
    queryFn: () => get(API_ENDPOINTS.withdrawals)
  })
}

// refunds
export const useRefunds = () => {
  return useQuery({
    queryKey: ['refunds'],
    queryFn: () => get(`${API_ENDPOINTS.allBookings}?status=cancelled`)
  })
}

// one time registeration
export const useOneTimeReg = () => {
  return useQuery({
    queryKey: ['one-time-reg'],
    queryFn: () => get(`${API_ENDPOINTS.oneTimeRegistration}?type=registration`)
  })
}

// create admin settings
export const useCreateAdminSetting = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await post(API_ENDPOINTS.adminSettingsAdd, payload);
    },
  });
}

// admin settings
export const useAdminSettings = () => {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => get(`${API_ENDPOINTS.adminSettings}?type=registration`)
  })
}

// adminsettings delete
export const useDeleteAdminSetting = () => {
  return useMutation({
    mutationFn: async (id) => {
      return await deletes(`${API_ENDPOINTS.adminSettingsDelete}/deleteSettings/${id}`);
    },
  });
}

// get subcription list 
export const useSubscriptionList = () => {
  return useQuery({
    queryKey: ['subcription-list'],
    queryFn: () => get(`${API_ENDPOINTS.subscriptionList}/all-plans`),
    placeholderData: (previousData) => previousData,
  })
}

// update subcription status
export const useUpdateSubcriptionStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }) => {
      return await patch(
        `${API_ENDPOINTS.subscriptionListStatus}/${id}`,
        {
          status,
        }
      );
    },
  })
}

// post subscription
export const usePostSubcription = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await post(API_ENDPOINTS.subscriptionAdd, payload);
    },
  })
}

// assign chef
export const useChefAssign = () => {
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      return await patch(
        `${API_ENDPOINTS.subscriptionUpdate}/${id}`, payload);
    },
  })
}