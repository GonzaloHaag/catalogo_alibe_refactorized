import { getAllCategories } from "../services/queries/categories"

export const FilterCategories = () => {
  const response = getAllCategories();

  if(response.isLoading) {
    return <span className='text-sm text-gray-400'>Cargando...</span>
  }
  if(response.isError) {
    return <span className='text-red-600'>Ocurrió un error</span>
  }
  const categories = response.data.categories || [];
  return (
    <ul className='category-list mt-4 md:mt-0 flex gap-4 overflow-y-visible overflow-x-auto md:overflow-x-visible md:flex-col md:w-44 lg:w-48 mx-0'>
        {
          categories?.length > 0 && (
              categories?.map((categorie) => (
                <li key={categorie.id} title={categorie.nombre} className='bg-[#EDEDED] text-sm text-left pl-4 py-2 rounded'>
                   {categorie.nombre}
                </li>
              ))
          )
        }
    </ul>
  )
}
