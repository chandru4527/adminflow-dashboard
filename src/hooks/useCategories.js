import { useQuery } from "@tanstack/react-query";

import categoriesData from '../data/categories.json';

const getCategories = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return categoriesData;
}

const CATEGORIES_KEY = ["categories"];

export const useCategories = () => useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: getCategories,
})
