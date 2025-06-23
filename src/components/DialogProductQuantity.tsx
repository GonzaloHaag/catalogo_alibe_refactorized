import { useState, useEffect } from "preact/hooks";
import type { Product } from "../types/types";

interface Props {
  product: Product;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  addToProductInCart: (product: Product, productQuantity: number) => void;
}

export const DialogProductQuantity = ({
  product,
  isOpen,
  onOpen,
  onClose,
  addToProductInCart,
}: Props) => {
  const [productQuantity, setProductQuantity] = useState(1);

  // Reset quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      setProductQuantity(1);
    }
  }, [isOpen]);

  const subtotal = productQuantity < 1 ? 0 : product.precio_final * productQuantity;
  const discount = productQuantity > 3 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const addProduct = () => {
    addToProductInCart(product, productQuantity);
    onClose();
    setProductQuantity(1);
  };
  return (
    <>
      <button
        type="button"
        className="rounded-2xl normal-case relative mt-4 mb-0 text-xs px-2 md:text-sm w-full bg-red-600 text-slate-100 py-2 cursor-pointer outline-none"
        onClick={onOpen}
      >
        Agregar
      </button>
      {isOpen && (
        <div
          className={
            "flex items-center justify-center fixed inset-0 min-h-screen w-full bg-black/40 z-10 px-4"
          }
          onClick={onClose}
        >
          <div
            className="bg-slate-100 w-full sm:max-w-[425px] h-auto p-4 rounded-md flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000000"
                  d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm7.764 11h10.515l2.334-7H5.855zM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0"
                />
              </svg>
              Añadir al pedido
            </h4>
            <span className="text-slate-600 text-sm md:text-base mt-2">
              {product.nombre} -{" "}
              <b className="text-green-600">
                ${product.precio_final.toFixed(2)}
              </b>
            </span>
            <div className="flex flex-col gap-y-1 mt-4">
              <label htmlFor="cantidad">Cantidad</label>
              <div className="flex items-center gap-x-2">
                <input
                  value={productQuantity}
                  onChange={(e) =>
                    setProductQuantity(
                      Number((e.target as HTMLInputElement).value)
                    )
                  }
                  type="number"
                  min={1}
                  placeholder="Ingrese la cantidad del producto"
                  className="w-full py-3 px-4 rounded-md border border-gray-200"
                />
                <div className="flex items-center gap-x-1">
                  <button
                    type="button"
                    title="Disminuir"
                    className="border border-gray-200 p-2 cursor-pointer"
                    onClick={() => setProductQuantity((prevState) => prevState <= 1 ? 1 : prevState - 1)}
                    disabled={productQuantity <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path fill="#000000" d="M19 13H5v-2h14z" />
                    </svg>
                  </button>
                  <button type="button" title="Aumentar"
                  className="border border-gray-200 p-2 cursor-pointer"
                  onClick={() => setProductQuantity((prevState) => prevState + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000000"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <span className="text-green-600 font-semibold">
                10% de descuento llevando más de 3 unidades.
              </span>
            </div>
            <span className="mt-4 text-base font-semibold">
              Total: ${total.toFixed(2)}
              {productQuantity > 3 && " - descuento aplicado!"}
            </span>
            <div className="flex items-center justify-end gap-x-4 mt-4">
              <button
                type="button"
                title="Cancelar"
                onClick={onClose}
                className="cursor-pointer py-2 rounded border border-gray-200 w-20"
              >
                Cancelar
              </button>
              <button
                type="button"
                title="Cancelar"
                onClick={addProduct}
                className="cursor-pointer py-2 rounded border border-red-600 bg-red-600 text-slate-100 w-20"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
