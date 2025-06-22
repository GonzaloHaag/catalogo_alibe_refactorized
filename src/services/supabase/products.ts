import { supabase } from '../../supabase-client';
import type { Product } from '../../types/types';
export const getProducts = async( searchTerm:string ):Promise<{ok:boolean,products?:Product[]}> => {

    try {
    let query = supabase
    .from('products')
    .select(`id,nombre,precio,precio_final,iva,stock,idRubro,foto`)
    .order('nombre',{ascending:true})
    if(searchTerm !== '') {
        query.like('nombre',`%${searchTerm.toUpperCase()}%`)
    }
    const {data,error} = await query; 
    if(error) {
        return {
            ok:false
        }
    }
    return {
        ok:true,
        products: data
    }
    } catch (error) {
        console.error(error);
        return {
            ok:false
        }
    }
}