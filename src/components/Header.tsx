import type { Product } from "../types/types";
import { Cart } from "./Cart";

interface ProductCart extends Product {
  cantidad: number;
}

interface Props {
  productsInCart: ProductCart[];
  removeProductInCart: (productId: number) => void;
}

export const Header = ({ productsInCart, removeProductInCart }: Props) => {
  const totalQuantityInCart = productsInCart.reduce(
    (acc, p) => acc + p.cantidad,
    0
  );
  const totalCart = productsInCart.reduce((acc, p) => {
    const subtotal = p.precio_final * p.cantidad;
    const total = p.cantidad > 3 ? subtotal * 0.9 : subtotal;
    return acc + total;
  }, 0);

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "¡Hola! Quiero hacer el siguiente pedido:\n\n";

    productsInCart.forEach((item, index) => {
      const itemTotalPrice = item.precio_final * item.cantidad;
      const itemDiscountedPrice = item.cantidad > 3 ? itemTotalPrice * 0.9 : itemTotalPrice;

      message += `Producto ${index + 1}:\n`;
      message += `- Nombre: ${item.nombre}\n`;
      message += `- Cantidad: ${item.cantidad}\n`;
      message += `- Precio unitario: $${item.precio_final.toFixed(2)}\n`;
      message += `- Precio total: $${itemDiscountedPrice.toFixed(2)}\n`;
      if (item.cantidad > 3) {
        message += `  (10% de descuento aplicado)\n`;
      }
      message += "\n";
    });

    message += `Total del pedido: $${totalCart.toFixed(2)}\n\n`;
    message += "¿Podrías confirmar mi pedido, por favor?";

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/543425332182?text=${encodedMessage}`;
  };

  return (
    <header className="w-full h-24 px-4 border-b border-gray-200">
      <div className="w-full md:max-w-6xl md:mx-auto flex items-center justify-between h-full">
        <a href={"/"}>
          <img
            src={"../src/assets/LogoAlibe.avif"}
            alt={"Logo alibe distribuidora"}
            width={140}
            height={40}
            loading={"eager"}
            fetchPriority={"high"}
          />
        </a>
        <div className="relative">
          {/* Hidden checkbox to control cart state */}
          <input type="checkbox" id="cart-toggle" className="peer hidden" />

          {/* Cart button */}
          <label htmlFor="cart-toggle" className="relative cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#333333"
                d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm7.764 11h10.515l2.334-7H5.855zM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0"
              />
            </svg>
            <span className="absolute -top-6 -right-3 bg-red-500 text-slate-100 rounded-full w-8 h-8 flex items-center justify-center text-center">
              {totalQuantityInCart}
            </span>
          </label>

          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300 ease-in-out"></div>

          {/* Cart sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out">
            <div className="p-6 h-full flex flex-col">
              {/* Cart header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Carrito</h2>
                <label htmlFor="cart-toggle" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </label>
              </div>

              {/* Cart content */}
              <div className="flex-1 overflow-y-auto">
                <Cart
                  productsInCart={productsInCart}
                  removeProductInCart={removeProductInCart}
                />
              </div>

              {/* Cart footer */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">${totalCart.toFixed(2)}</span>
                </div>
                <button
                  disabled={productsInCart.length === 0}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-200 flex items-center gap-x-4 justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (productsInCart.length > 0) {
                      window.open(generateWhatsAppMessage(), '_blank');
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1s-.6.8-.8 1c-.1.2-.3.2-.5.1c-.7-.3-1.4-.7-2-1.2c-.5-.5-1-1.1-1.4-1.7c-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4c.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6c1.1 1.6 2.5 2.9 4.2 3.7c.5.2.9.4 1.4.5c.5.2 1 .2 1.6.1c.7-.1 1.3-.6 1.7-1.2c.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2c5.5 0 9.9-4.4 9.9-9.9c.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3c-1.5 0-2.9-.4-4.2-1.1l-.3-.2l-3.1.8l.8-3l-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4"
                    />
                  </svg>
                  Realizar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
