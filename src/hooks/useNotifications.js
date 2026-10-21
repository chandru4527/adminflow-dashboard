import { useQuery } from "@tanstack/react-query";

import notifications from "../data/notifications.json";

const getNotifications = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return notifications;
};

export const NOTIFICATIONS_KEY = ["notifications"];

export const useNotifications = () => {
    return useQuery({
        queryKey: NOTIFICATIONS_KEY,
        queryFn: getNotifications,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
};