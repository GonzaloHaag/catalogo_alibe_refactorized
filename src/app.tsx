import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterCategories, Header, ProductsContainer } from "./components";

const queryClient = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={ queryClient }>
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <main className='w-full md:max-w-6xl md:mx-auto mt-4'>
        <div className='flex w-full flex-col justify-between md:flex-row md:gap-8 px-4'>
          <div className='flex flex-col gap-y-4'>
            <span className='text-gray-500 mt-2'>Categorías</span>
            <FilterCategories />
          </div>
          <div className='flex w-full flex-col justify-start md:gap-8'>
             <div className='px-4'>
              <div className='relative'>
              <input type='text' placeholder='Buscar productos...' className='w-full px-8 py-2 rounded-md' />
              <svg className='absolute left-2 top-0 bottom-0 my-auto' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#cccccc" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"/></svg>
              </div>
                <div className='container relative flex flex-col items-center h-full mt-3'>
                  <div class="w-full text-sm text-center sm:text-left"><span class="opacity-50">532 productos</span></div>
                   {/** Productos */}
                  <ProductsContainer />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
    </QueryClientProvider>
  )
}
