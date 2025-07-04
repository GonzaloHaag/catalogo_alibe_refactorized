import { getAllCategories } from "../services/queries/categories"
import type { Category } from "../types/types";

interface Props {
   categorySelected:number;
   handleCategorySelected: (categoryId:number) => void;
}
export const FilterCategories = ({categorySelected,handleCategorySelected} : Props) => {
  const response = getAllCategories();

  if(response.isLoading) {
    return <span className='text-sm text-gray-400 mt-4 md:mt-0 md:w-44 lg:w-48 mx-0'>Cargando...</span>
  }
  if(response.isError) {
    return <span className='text-red-600 mt-4 md:mt-0 md:w-44 lg:w-48 mx-0'>Ocurrió un error</span>
  }
  
  const todosCategory: Category = { id: 0, nombre: 'TODOS' };
  
  const categories: Category[] = [
    todosCategory,
    ...(response.data?.categories || [])
  ];

  return (
    <ul className='mt-4 md:mt-0 flex flex-row gap-2 overflow-x-auto md:overflow-x-visible md:flex-col md:w-44 lg:w-48 pb-2'>
        {
          categories?.length > 0 && (
              categories?.map((categorie) => (
                <li key={categorie.id} title={categorie.nombre} className='w-full'>
                   <button 
                   type='button' 
                  className={`${categorySelected === categorie.id ? 'bg-red-600 text-slate-100' : 'bg-[#EDEDED] text-blue-950 hover:bg-gray-200' } text-xs font-medium text-left px-4 py-2 rounded cursor-pointer transition-colors duration-200 whitespace-nowrap w-full md:w-full md:text-left md:px-2 md:pl-4`}
                   onClick={() => handleCategorySelected(categorie.id)}
                   >
                      {categorie.nombre}
                   </button>
                </li>
              ))
          )
        }
    </ul>
  )
}
