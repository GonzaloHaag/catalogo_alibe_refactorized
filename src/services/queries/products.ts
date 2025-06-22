import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../supabase/products"

export const getAllProducts = (searchTerm:string,categorySelected:number) => {
    const result = useQuery({
        queryKey:['products',searchTerm,categorySelected],
        queryFn:() => getProducts(searchTerm,categorySelected.toString()),
        
    });

    return result;
}