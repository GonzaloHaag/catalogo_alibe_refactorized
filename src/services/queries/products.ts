import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../supabase/products"

export const getAllProducts = (searchTerm:string,categorySelected:number,page:number,pageSize:number) => {
    const result = useQuery({
        queryKey:['products',searchTerm,categorySelected,page,pageSize],
        queryFn:() => getProducts(searchTerm,categorySelected.toString(),page,pageSize),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 60 * 2 // 2 hours
    });

    return result;
}