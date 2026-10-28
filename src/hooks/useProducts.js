import { useQuery } from "@tanstack/react-query";

import productsData from '../data/products.json';

const getProducts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return productsData;
}

const PRODUCTS_KEY = ["products"];

export const useProducts = () => useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: getProducts,
})
