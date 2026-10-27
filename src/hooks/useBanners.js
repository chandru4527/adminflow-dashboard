import { useQuery } from "@tanstack/react-query";

import bannersData from "../data/banners.json";

 const getBanners = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return bannersData;
};

const BANNERS_KEY = ["banners"];

export const useBanners = () => {
    return useQuery({
        queryKey: BANNERS_KEY,
        queryFn: getBanners,
        // staleTime: 5 * 60 * 1000,
        // retry: false,
    });
};