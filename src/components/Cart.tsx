import type { Product } from "../types/types";

interface ProductCart extends Product {
  cantidad: number;
}

interface CartProps {
  productsInCart: ProductCart[];
  removeProductInCart: (productId: number) => void
}

export const Cart = ({ productsInCart,removeProductInCart }: CartProps) => {
  if (!productsInCart.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-2 text-gray-300"
        >
          <path d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm7.764 11h10.515l2.334-7H5.855zM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0" />
        </svg>
        <h3 className="text-base font-medium mb-1">Tu carrito está vacío</h3>
        <p className="text-xs">Agrega algunos productos para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-2 max-h-96 overflow-y-auto">
      {productsInCart.map((product) => {
        const subtotal = product.precio_final * product.cantidad;
        const hasDiscount = product.cantidad > 3;
        const total = hasDiscount ? subtotal * 0.9 : subtotal;
        return (
          <div
            key={product.id}
            className="flex items-center space-x-2 p-2 bg-gray-50 rounded shadow-sm relative"
          >
            <button type='button' title='Borrar' className='cursor-pointer' onClick={() => removeProductInCart(product.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"/></svg>
            </button>
            <img
              src={
                product.foto && product.foto.includes("https://")
                  ? product.foto.match(/https:\/\/\S+/)?.[0]
                  : "/assets/placeholder.webp"
              }
              alt={product.nombre}
              className="w-10 h-10 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="truncate text-xs font-medium text-gray-800">{product.nombre}</div>
              <div className="flex items-center text-[11px] text-gray-600 gap-x-2">
                <span>${product.precio_final}</span>
                <span>x{product.cantidad}</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                {hasDiscount && (
                  <span className="text-[10px] text-blue-600 ml-1">-10%</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
