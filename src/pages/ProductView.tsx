import { useParams, useNavigate } from "react-router-dom";
import rawItems from "../data/products.json";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function ProductView() {
  const { sku } = useParams<{ sku: string }>();
  const navigate = useNavigate();
  const product = rawItems.find((p) => p.sku === sku);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-red-500">Produto não encontrado.</p>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const { getItemQtd, increaseCartQtd, decreaseCartQtd } = useShoppingCart();
  const quantity = getItemQtd(product.sku);

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate("/")}
        className="
          mb-6
          px-4 py-2
          bg-white text-black
          border border-gray-300
          rounded-full text-sm
          hover:bg-gray-100 transition
        "
      >
        ← Back to store
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={`/imgs/${product.image_downloads}.jpg`}
          alt={product.name}
          className="h-[850px] w-auto object-cover rounded"
        />

        <div className="flex-1 flex flex-col">
          <h1 className="text-5xl font-bold mb-6">{product.name}</h1>

          <hr className="border-t border-gray-200 mb-6" />

          <p className="text-lg text-gray-700 mb-8">{product.description}</p>

          <div className="flex space-x-4 mb-6">
            <span className="px-4 py-2 bg-gray-200 rounded-full text-base uppercase">
              {product.section}
            </span>
            <span className="px-4 py-2 bg-gray-200 rounded-full text-base">
              {product.terms}
            </span>
          </div>

          <p className="text-3xl font-semibold mb-6">
            ${price.toFixed(2)} {product.currency}
          </p>

          {quantity === 0 ? (
            <button
              onClick={() => increaseCartQtd(product.sku)}
              className="
                px-6 py-3
                bg-black text-white
                rounded-full
                font-medium text-lg
                hover:scale-105 hover:shadow-lg
                transition-transform transition-shadow
              "
            >
              Add to cart
            </button>
          ) : (
            <>
              <div className="relative h-12 mb-4">
                <button
                  onClick={() => decreaseCartQtd(product.sku)}
                  className="
                    absolute left-0 top-1/2 transform -translate-y-1/2
                    px-7 py-2
                    bg-white text-black
                    border border-black
                    rounded-full
                    font-medium text-lg
                    transition-transform transition-shadow
                    hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg
                    z-10
                  "
                >
                  –
                </button>
                <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-xl font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => increaseCartQtd(product.sku)}
                  className="
                    absolute right-0 top-1/2 transform -translate-y-1/2
                    px-7 py-2
                    bg-white text-black
                    border border-black
                    rounded-full
                    font-medium text-lg
                    transition-transform transition-shadow
                    hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg
                  "
                >
                  +
                </button>
              </div>

              <button
                onClick={() => navigate("/cart")}
                className="
                  px-6 py-3
                  bg-black text-white
                  rounded-full
                  font-medium text-lg
                  hover:scale-105 hover:shadow-lg
                  transition-transform transition-shadow
                "
              >
                Go to cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
