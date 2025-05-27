// src/pages/Cart.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import rawItems from "../data/products.json";

export function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseCartQtd,
    decreaseCartQtd,
    removeFromCart,
  } = useShoppingCart();
  const [showSuccess, setShowSuccess] = useState(false);

  // Mapa SKU → detalhes do produto
  const productsMap = new Map(
    rawItems.map((item) => [
      item.sku,
      { ...item, price: parseFloat(item.price) },
    ])
  );

  // Monta lista de itens com totais
  const items = cartItems.map(({ sku, quantity }) => {
    const p = productsMap.get(sku)!;
    return {
      sku,
      name: p.name,
      image: p.image_downloads,
      price: p.price,
      quantity,
      total: p.price * quantity,
    };
  });

  const subtotal = items.reduce((sum, x) => sum + x.total, 0);

  function handleCheckout() {
    setShowSuccess(true);
  }

  function handleClose() {
    // esvazia o carrinho
    cartItems.forEach((item) => removeFromCart(item.sku));
    setShowSuccess(false);
    navigate("/");
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={() => navigate("/")}
          className="
            px-6 py-3
            bg-white text-black
            border border-black
            rounded-full
            font-medium text-lg
            hover:bg-gray-100
            transition
          "
        >
          Continue Shopping
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabela de itens */}
        <div className="flex-1 overflow-x-auto">
          <table className="table-fixed w-full text-left">
            <thead>
              <tr>
                <th className="w-1/2 pb-2 text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="w-1/6 pb-2 text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="w-1/6 pb-2 text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="w-1/6 pb-2 text-sm font-medium text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.sku}>
                  <td className="py-4 flex items-center">
                    <img
                      src={`/imgs/${item.image}.jpg`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </td>
                  <td className="py-4 text-sm">${item.price.toFixed(2)}</td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => decreaseCartQtd(item.sku)}
                        className="px-2 py-1 bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition"
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseCartQtd(item.sku)}
                        className="px-2 py-1 bg-white text-black border border-black rounded-full hover:bg-black hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 text-sm">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary (sticky) */}
        <div
          className="
            w-full lg:w-1/3
            self-start
            sticky top-20
            bg-white p-6 rounded-lg shadow
          "
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <hr className="border-gray-200 mb-4" />

          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700">Subtotal</span>
            <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-700">Shipping</span>
            <span className="text-sm font-medium">Free</span>
          </div>
          <hr className="border-gray-200 mb-4" />
          <div className="flex justify-between mb-6">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="
              w-full px-6 py-3
              bg-black text-white
              rounded-full
              font-medium text-lg
              hover:scale-105 hover:shadow-lg
              transition-transform transition-shadow
            "
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Pop-up de sucesso (sem overlay escuro) */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-2xl pointer-events-auto">
            <h2 className="text-2xl font-bold mb-4">Purchase Successful!</h2>
            <p className="mb-6">
              Thank you for your purchase. You will receive confirmation by email shortly.
            </p>
            <button
              onClick={handleClose}
              className="
                px-6 py-3
                bg-black text-white
                rounded-full
                font-medium text-lg
                hover:scale-105 hover:shadow-lg
                transition-transform transition-shadow
              "
            >
              Back to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
