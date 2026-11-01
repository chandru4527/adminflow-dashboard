import { useQuery } from "@tanstack/react-query";
import revenueData from "../data/revenue.json";

const REVENUE_KEY = ["revenue"];

const fetchRevenue = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return revenueData;
};

export const useRevenue = () => {
    return useQuery({
        queryKey: REVENUE_KEY,
        queryFn: fetchRevenue,
        // staleTime: 5 * 60 * 1000,
        // retry: false,
    });
};