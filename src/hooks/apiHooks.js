import { useQuery, useMutation } from "@tanstack/react-query";
import { get, post, put, patch, deletes, postFormData } from "../api/axios";
import endPoints from "../api/api_url_helper";


// dashboard
export const useDashboardStats = () =>
  useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => get(endPoints.dashboard.overview),
  });