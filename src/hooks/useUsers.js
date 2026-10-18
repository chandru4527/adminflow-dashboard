import { useQuery } from "@tanstack/react-query";
import { get } from "../api/axios";
import { Endpoints } from "../api/endpoints";

export const useUsers = (params = {}) =>
    useQuery({
        queryKey: ["users", params],
        queryFn: async () => {
            const endpoint = params.q ? `${Endpoints.USERS}/search` : Endpoints.USERS;

            const { q, ...restParams } = params;

            return await get(endpoint, {
                params: {
                    ...restParams,
                    ...(q ? { q } : {}),
                },
            });
        },
    });