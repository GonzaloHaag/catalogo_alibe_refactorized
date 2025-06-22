import { supabase } from '../../supabase-client';
import type { Product } from '../../types/types';
export const getProducts = async():Promise<{ok:boolean,products?:Product[]}> => {
    try {
    const {data,error} = await supabase
    .from('products')
    .select(`id,nombre,precio,precio_final,iva,stock,idRubro,foto`)
    .order('nombre',{ascending:true})
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