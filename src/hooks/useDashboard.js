import { useQuery } from "@tanstack/react-query";
import dashboardData from "../data/dashboard.json";

const DASHBOARD_KEY = ["dashboard"];

const fetchDashboard = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return dashboardData;
};

export const useDashboard = () => {
    return useQuery({
        queryKey: DASHBOARD_KEY,
        queryFn: fetchDashboard,
        // staleTime: 5 * 60 * 1000,
        // retry: false,
    });
};