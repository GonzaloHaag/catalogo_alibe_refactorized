import type { Product } from "../types/types"
import { DialogProductQuantity } from "./DialogProductQuantity"

interface Props {
    product: Product
    selectedProduct: Product | null
    onOpenDialog: () => void
    onCloseDialog: () => void
    addToProductInCart: (product: Product, productQuantity: number) => void
}
export const ProductCard = ({ product, selectedProduct, onOpenDialog, onCloseDialog,addToProductInCart }: Props) => {
    
    return (
        <div
            key={product.id}
            className="w-full shadow-xl rounded-sm flex flex-col relative transition-all duration-200 hover:scale[1.3]"
        >
            <img
                src={
                    product.foto && product.foto.includes("https://")
                        ? product.foto.match(/https:\/\/\S+/)?.[0]
                        : "/assets/placeholder.webp"
                }
                alt={product.nombre}
                className="m-0 object-contain h-[120px] md:h-[80px] lg:h-[120px]"
            />
            <div className="p-4 text-xs md:text-sm justify-between">
                <div class="flex flex-col">
                    <span class="font-bold truncate">{product.nombre}</span>
                    <span class="text-sm opacity-70 font-semibold">${product.precio_final}</span>
                </div>
                <div class="flex flex-col"></div>

                <DialogProductQuantity 
                    product={product}
                    isOpen={selectedProduct?.id === product.id}
                    onOpen={onOpenDialog}
                    onClose={onCloseDialog}
                    addToProductInCart={addToProductInCart}
                />
            </div>
        </div>
    )
}
