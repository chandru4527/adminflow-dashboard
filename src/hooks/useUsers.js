import { useQuery } from "@tanstack/react-query";
import usersData from "../data/users.json";

const getUsers = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return usersData;
};

const USERS_KEY = ["users"];

export const useUsers = () => useQuery({
    queryKey: USERS_KEY,
    queryFn: getUsers,
    // staleTime: 5 * 60 * 1000,
    // retry: false,
});