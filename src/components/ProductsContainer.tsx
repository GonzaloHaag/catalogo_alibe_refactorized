import { getAllProducts } from "../services/queries/products";
import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "preact/hooks";
import type { Product } from "../types/types";

interface Props {
  searchTerm: string;
  categorySelected:number;
}
export const ProductsContainer = ({ searchTerm,categorySelected }: Props) => {
  const response = getAllProducts(searchTerm,categorySelected);
  if (response.isLoading) {
    return <span className="text-center text-sm w-full">Cargando productos...</span>;
  }
  if (response.isError) {
    return (
      <span className="text-center text-sm text-red-600 w-full">Ocurrió un error</span>
    );
  }
  const products = response.data.products || [];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseDialog = () => {
    setSelectedProduct(null)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseDialog();
      }
    };

    if (selectedProduct) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);
  
  return (
    <section className="w-full grid gap-4 grid-cols-2 sm:grid-cols-4 mt-4">
      {
        products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={ product } 
              onOpenDialog={() => handleSelectProduct(product)}
              onCloseDialog={handleCloseDialog}
              selectedProduct={selectedProduct}
            />
          ))
        ) : (
          <span className='col-span-full text-center text-gray-900'>No se encontraron resultados</span>
        )
      }
    </section>
  );
};
