// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useShoppingCart, type ShoppingCartContextType } from "../context/ShoppingCartContext";
import { ShoppingCart } from "lucide-react";
import rawItems from "../data/products.json";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

type Product = {
    sku: string;
    name: string; 
    price: number;
    currency: string;
    image_downloads: string;
}

export function Navbar({ searchTerm, setSearchTerm }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, cartQuantity, increaseCartQtd, decreaseCartQtd } = useShoppingCart() as ShoppingCartContextType;

  const isStorePage = location.pathname === "/" || location.pathname.startsWith("/product/");

  const productsMap = new Map<string, Product>(
    rawItems.map((item) => [
        item.sku,
        {
            sku: item.sku,
            name: item.name,
            price: parseFloat(item.price),
            currency: item.currency,
            image_downloads: item.image_downloads
        },
    ])
  );

  const previewItems = cartItems.map(({ sku, quantity }) => {
    const p = productsMap.get(sku)!;
    return {...p,quantity};
  });

  const total = previewItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <nav
    className="sticky top-0 inset-x-0 z-50 bg-white shadow-md h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          ZaraLab
        </Link>

        {isStorePage ? (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-1 max-w-lg px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"/>
        ) : (
            <div className="text-2xl font-semibold text-black">
                Your Cart
            </div>
        )}

        <div className="relative group">
            <button
            onClick={() => navigate("/cart")}
            aria-label="Cart"
            className="relative w-12 h-12 bg-white text-black ring-1 ring-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
                <ShoppingCart className="w-6 h-6" />
                {cartQuantity > 0 && (
                    <span
                    className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                        {cartQuantity}
                    </span>
                )}
            </button>

            {isStorePage && previewItems.length > 0 && (
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg p-4 transition-all">
                    <ul className="max-h-58 overflow-auto space-y-4">
                        {previewItems.map((item) => (
                            <li key={item.sku} className="flex items-center px-2">
                                <img
                                    src={`/imgs/${item.image_downloads}.jpg`}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded mr-3"/>
                                <div className="flex-1 px-2">
                                    <div className="text-sm font-medium line-clamp-2 h-10 overflow-hidden">{item.name}</div>
                                    <div className="text-xs text-gray-600">
                                        ${item.price} {item.currency}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button 
                                        onClick={() => decreaseCartQtd(item.sku)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                                            -
                                    </button>
                                    <span className="text-sm">{item.quantity}</span>
                                    <button 
                                        onClick={() => increaseCartQtd(item.sku)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                                            +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between">
                        <span className="font-semibold">Total: ${total.toFixed(2)}</span>
                        <button 
                            onClick={() => navigate("/cart")}
                            className="px-4 py-2 bg-black text-white rounded-full text-sm">
                            Go to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    </nav>
    );
}
