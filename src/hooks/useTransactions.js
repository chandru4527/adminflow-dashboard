import { useQuery } from "@tanstack/react-query";
import transactionsData from "../data/transactions.json";

const TRANSACTIONS_KEY = ["transactions"];

const fetchTransactions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return transactionsData;
};

export const useTransactions = () => {
    return useQuery({
        queryKey: TRANSACTIONS_KEY,
        queryFn: fetchTransactions,
        // staleTime: 5 * 60 * 1000,
        // retry: false,
    });
};