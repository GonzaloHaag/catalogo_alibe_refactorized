
export const SearchProducts = () => {
    return (
        <form className='relative'>
            <input type='text' placeholder='Buscar productos...' className='w-full px-8 py-2 rounded-md focus:outline-red-600' />
            <svg className='absolute left-2 top-0 bottom-0 my-auto' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#cccccc" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7" /></svg>
        </form>
    )
}
