import { useEffect, useState } from 'preact/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterCategories, Header, ProductsContainer, SearchProducts } from "./components";
import type { Product } from './types/types';

interface ProductCart extends Product {
  cantidad:number;
}
const cartLocalStorage = localStorage.getItem('carrito');
const initialCart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
const queryClient = new QueryClient();
export function App() {
  const [searchValue,setSearchValue] = useState<string>('');
  const [categorySelected,setCategorySelected] = useState<number>(0);
  const [productsInCart,setProductsInCart] = useState<ProductCart[] | []>(initialCart);
  const handleSearchTerm = (term:string) => {
   setSearchValue(term)
  }
  const handleCategorySelected = (categoryId:number) => {
      setCategorySelected(categoryId);
  }
  const addToProductInCart = (product:Product,productQuantity:number) => {
    const itemAgregado = {...product, cantidad:productQuantity}
    const nuevoCarrito = [...productsInCart];

    const estaEnCarrito = nuevoCarrito.find((cartP) => cartP.id === itemAgregado.id);
    if(estaEnCarrito) {
       estaEnCarrito.cantidad += productQuantity
       // No multiplicamos precio_final, mantenemos el precio unitario
    } else {
       nuevoCarrito.push(itemAgregado)
    }
    setProductsInCart(nuevoCarrito)
  }

  const removeProductInCart = (productId:number) => {
    setProductsInCart((prevState) => [...prevState.filter((p) => p.id !== productId)])
  }
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(productsInCart)); // cada vez que cart cambia lo actualizamos
  }, [productsInCart]);
  return (
    <QueryClientProvider client={ queryClient }>
    <div className="min-h-screen">
      <Header productsInCart={ productsInCart } removeProductInCart={removeProductInCart} />
      <main className='w-full md:max-w-6xl md:mx-auto mt-4 px-4'>
        <div className='flex w-full flex-col justify-between md:flex-row md:gap-8'>
          <div className='flex flex-col gap-y-0 md:gap-y-4 max-w-full'>
            <span className='text-gray-500 mt-2'>Categorías</span>
            <FilterCategories categorySelected={categorySelected} handleCategorySelected={handleCategorySelected} />
          </div>
          <div className='flex w-full flex-col justify-start md:gap-8'>
             <div className='w-full'>
              <SearchProducts searchTerm={searchValue} handleSearchTerm={handleSearchTerm} />
                <div className='container relative flex flex-col items-center h-full mt-3 w-full'>
                  <div class="w-full text-sm text-center sm:text-left"><span class="opacity-50">523 productos</span></div>
                   {/** Productos */}
                  <ProductsContainer searchTerm={searchValue} categorySelected={categorySelected} addToProductInCart={addToProductInCart} />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
    </QueryClientProvider>
  )
}
