import { useQuery } from "@tanstack/react-query";

import ordersData from '../data/orders.json';

const getOrders = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return ordersData;
}

const ORDERS_KEY = ["orders"];

export const useOrders = () => useQuery({
    queryKey: ORDERS_KEY,
    queryFn: getOrders,
})
