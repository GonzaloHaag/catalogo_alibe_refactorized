import { supabase } from '../../supabase-client';
import type { Product } from '../../types/types';
export const getProducts = async( searchTerm:string,categorySelected:string, page:number, pageSize:number):Promise<{ok:boolean,products?:Product[],total?:number | null}> => {
    try {
    let query = supabase
    .from('products')
    .select(`id,nombre,precio,precio_final,iva,stock,idRubro,foto`,{ count: 'exact' })
    .order('nombre',{ascending:true})
    
    if(searchTerm !== '') {
        query = query.like('nombre',`%${searchTerm.toUpperCase()}%`);
        // No paginamos cuando hay búsqueda
    } else {
        // Solo paginamos cuando NO hay búsqueda
        const from = page * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
    }

    if(categorySelected !== '0') { query = query.eq('idRubro',categorySelected) }
    const { data,count,error } = await query; 
    if(error) {
        return {
            ok:false
        }
    }
    return {
        ok:true,
        products: data,
        total:count
    }
    } catch (error) {
        console.error(error);
        return {
            ok:false
        }
    }
}