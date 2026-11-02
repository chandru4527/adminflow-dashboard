import { useQuery } from "@tanstack/react-query";
import subAdmins from "../data/subAdmins.json";

const SUB_ADMIN_KEY = ["subAdmins"];

const fetchSubAdmins = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return subAdmins;
};

export const useSubAdmins = () => {
    return useQuery({
        queryKey: SUB_ADMIN_KEY,
        queryFn: fetchSubAdmins,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
};