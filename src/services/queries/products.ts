import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../supabase/products"

export const getAllProducts = (searchTerm:string) => {
    const result = useQuery({
        queryKey:['products',searchTerm],
        queryFn:() => getProducts(searchTerm),
        
    });

    return result;
}