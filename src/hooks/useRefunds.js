import { useQuery } from "@tanstack/react-query";
import refunds from "../data/refunds.json";

const REFUND_KEY = ["refunds"];

const fetchRefunds = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return refunds;
};

export const useRefunds = () => {
    return useQuery({
        queryKey: REFUND_KEY,
        queryFn: fetchRefunds,
        // staleTime: 5 * 60 * 1000,
        // retry: false,
    });
};