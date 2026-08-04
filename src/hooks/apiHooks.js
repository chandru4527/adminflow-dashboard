import { useQuery, useMutation } from "@tanstack/react-query";
import { get, post, put, patch, deletes, postFormData } from "../api/axios";
import { API_ENDPOINTS } from '../api/api_url_helper'


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

// chef manage
export const useChefDetails = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["chefManage", page, limit],
    queryFn: () =>
      get(`${API_ENDPOINTS.usersRole}?role=chef&verificationStatus=approved&page=${page}&limit=${limit}`),
    placeholderData: (previousData) => previousData,
  });
};

// aprovels
export const useChefApprove = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["chefManage", page, limit],
    queryFn: () =>
      get(`${APPROVECHEF}?page=${page}&role=chef&verificationStatus=pending&limit=${limit}`),
    placeholderData: (previousData) => previousData,
  });
};
