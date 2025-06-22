import { getAllProducts } from "../services/queries/products";

export const ProductsContainer = () => {
  const response = getAllProducts();
  if (response.isLoading) {
    return <span className="text-center text-sm w-full">Cargando productos...</span>;
  }
  if (response.isError) {
    return (
      <span className="text-center text-sm text-red-600 w-full">Ocurrió un error</span>
    );
  }
  const products = response.data.products || [];
  return (
    <section className="w-full grid gap-4 grid-cols-2 sm:grid-cols-4">
      {products.length > 0 &&
        products.map((product) => (
          <div
            key={product.id}
            className="w-full shadow-xl rounded-sm flex flex-col relative transition-all duration-200 hover:scale[1.3]"
          >
            <img
              src={
                product.foto && product.foto.includes("https://")
                  ? product.foto.match(/https:\/\/\S+/)?.[0]
                  : "../src/assets/placeholder.webp"
              }
              alt={product.nombre}
              className="m-0 object-contain h-[120px] md:h-[80px] lg:h-[120px]"
            />
            <div className="card-body p-4 text-sm justify-between">
              <div class="flex flex-col">
                <span class="font-bold truncate">{product.nombre}</span>
                <span class="text-xs opacity-50">Minimo de unidades: 1</span>
              </div>
                <div class="flex flex-col"></div>
                <button
                  type="button"
                  class="rounded-2xl normal-case relative mt-4 mb-0 text-sm w-full bg-red-600 text-slate-100 py-2 cursor-pointer"
                >
                  Agregar al pedido
                </button>
            </div>
          </div>
        ))}
    </section>
  );
};
