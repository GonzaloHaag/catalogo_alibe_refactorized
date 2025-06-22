// llamadas a supabase
import { supabase } from '../../supabase-client';
import type { Category } from '../../types/types';
export const getCategories = async () : Promise<{ok:boolean,categories?:null | Category[] }> => {
    try {
        const { data, error } = await supabase
        .from('categories')
        .select(`id,nombre`)
        .order('nombre',{ascending:true});
        if(error) {
            return {
                ok:false
            }
        }
        return {
            ok:true,
            categories: data
        }
    } catch (error) {
        console.error(error);
        return {
            ok:false
        }
    }
}