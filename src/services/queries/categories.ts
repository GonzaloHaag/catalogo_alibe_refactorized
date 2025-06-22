import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../supabase/categories"

// uso de react query
export const getAllCategories = () => {
    const result = useQuery({
        queryKey:['categories'],
        queryFn:getCategories
    });

    return result;
}