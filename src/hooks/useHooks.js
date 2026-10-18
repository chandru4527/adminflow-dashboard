import { useQuery } from "@tanstack/react-query";
import { get } from '../api/axios';
import { Endpoints } from '../api/endpoints';

const getAllData = async () => {
    const [users, products, carts] = await Promise.all([
        get(Endpoints.USERS, { params: { limit: 0 } }),
        get(Endpoints.PRODUCTS, { params: { limit: 0 } }),
        get(Endpoints.CARTS, { params: { limit: 0 } }),
    ]);

    return {
        totalUsers: users,
        totalProducts: products,
        totalCarts: carts,
    };
};

const ALL_KEY = ["dashboard", "stats",];

export const useAllData = () => {
    return useQuery({
        queryKey: ALL_KEY,
        queryFn: getAllData,
    });
};