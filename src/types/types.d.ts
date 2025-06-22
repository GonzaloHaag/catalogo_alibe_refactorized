export interface Category {
    id:number;
    nombre:string;
}
export interface Product {
    id:number;
    nombre:string;
    precio:number;
    precio_final:number;
    iva:number;
    stock:number;
    idRubro:string;
    foto:string;
}