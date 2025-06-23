import { getAllProducts } from "../services/queries/products";
import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "preact/hooks";
import type { Product } from "../types/types";

interface Props {
  searchTerm: string;
  categorySelected: number;
  addToProductInCart: (product: Product, productQuantity: number) => void;
}
export const ProductsContainer = ({
  searchTerm,
  categorySelected,
  addToProductInCart,
}: Props) => {
  const PAGE_SIZE = 20;
  const [page, setPage] = useState(0);

  // Resetear página a 0 cuando cambie la categoría
  useEffect(() => {
    setPage(0);
  }, [categorySelected]);

  const response = getAllProducts(
    searchTerm,
    categorySelected,
    page,
    PAGE_SIZE
  );
  if (response.isLoading) {
    return (
      <span className="text-center text-sm w-full">Cargando productos...</span>
    );
  }
  if (response.isError) {
    return (
      <span className="text-center text-sm text-red-600 w-full">
        Ocurrió un error
      </span>
    );
  }
  const products = response.data.products || [];
  const total = response.data.total || 0;
  const hasMore = (page + 1) * PAGE_SIZE < total;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseDialog();
      }
    };

    if (selectedProduct) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  return (
    <div className="flex flex-col">
      <section className="w-full grid gap-4 grid-cols-2 sm:grid-cols-4 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDialog={() => handleSelectProduct(product)}
              onCloseDialog={handleCloseDialog}
              selectedProduct={selectedProduct}
              addToProductInCart={addToProductInCart}
            />
          ))
        ) : (
          <span className="col-span-full text-center text-gray-900">
            No se encontraron resultados
          </span>
        )}
      </section>
      {searchTerm === "" && (
        <div className="flex flex-col my-6">
          <div className="w-full flex items-center justify-center gap-x-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="cursor-pointer border border-gray-200 rounded p-2"
              title="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
              >
                <path fill="#e11d48" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" />
              </svg>
            </button>
            <span>
              Página: {page + 1} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
              disabled={!hasMore}
              className="cursor-pointer border border-gray-200 rounded p-2"
              title="Siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#e11d48"
                  d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
                />
              </svg>
            </button>
          </div>
          {response.isFetching && (
            <span className="text-gray-600 text-center">Cargando...</span>
          )}
        </div>
      )}
    </div>
  );
};
