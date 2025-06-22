import { useState } from 'preact/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterCategories, Header, ProductsContainer, SearchProducts } from "./components";

const queryClient = new QueryClient();
export function App() {
  const [searchValue,setSearchValue] = useState<string>('');
  const [categorySelected,setCategorySelected] = useState<number>(0);

  const handleSearchTerm = (term:string) => {
   setSearchValue(term)
  }
  const handleCategorySelected = (categoryId:number) => {
      setCategorySelected(categoryId);
  }
  return (
    <QueryClientProvider client={ queryClient }>
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <main className='w-full md:max-w-6xl md:mx-auto mt-4'>
        <div className='flex w-full flex-col justify-between md:flex-row md:gap-8 px-4'>
          <div className='flex flex-col gap-y-4'>
            <span className='text-gray-500 mt-2'>Categorías</span>
            <FilterCategories categorySelected={categorySelected} handleCategorySelected={handleCategorySelected} />
          </div>
          <div className='flex w-full flex-col justify-start md:gap-8'>
             <div className='px-4'>
              <SearchProducts searchTerm={searchValue} handleSearchTerm={handleSearchTerm} />
                <div className='container relative flex flex-col items-center h-full mt-3'>
                  <div class="w-full text-sm text-center sm:text-left"><span class="opacity-50">532 productos</span></div>
                   {/** Productos */}
                  <ProductsContainer searchTerm={searchValue} categorySelected={categorySelected} />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
    </QueryClientProvider>
  )
}
