import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../supabase/products"

export const getAllProducts = () => {
    const result = useQuery({
        queryKey:['products'],
        queryFn:getProducts
    });

    return result;
}