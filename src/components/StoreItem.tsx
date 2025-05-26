import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";

type StoreItemProps = {
    sku: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    terms: string;
    section: string;
    image_downloads: string;
}

export function StoreItem({sku, name, description, price, currency, terms, section, image_downloads}: StoreItemProps){
    
    const imgSrc = `/imgs/${image_downloads}.jpg`;
    const {getItemQtd, increaseCartQtd, decreaseCartQtd} = useShoppingCart();
    const quantity = getItemQtd(sku);

    return(
        <div className="w-[260px] bg-white inline-block pt-[10px] transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
           <Link to={`/product/${sku}`} className="block no-underline">

            <img
                src={imgSrc}
                alt={name}
                className="block w-[240px] h-[360px] object-cover mx-auto"
            />
            <div className="bg-white p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
                <div>
                    <p className="text-base font-normal text-gray-800 line-clamp-2">
                        {name} | {description}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                        ${price} {currency}
                    </p>
                </div>
                </div>
           </Link>
            <div className="bg-white p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
                {quantity === 0 ? (
                    <div className="flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-black text-white rounded-full font-medium text-sm transition-transform transition-shadow hover:scale-105 hover:shadow-lg">
                            Buy now
                        </button>
                        <button className="flex-1 px-4 py-2 bg-white text-black border border-black rounded-full font-medium text-sm transition-transform transition-shadow hover:scale-105 hover:shadow-lg"
                        onClick={() => increaseCartQtd(sku)}>
                            Add to cart
                        </button>
                    </div>
                ) : (
                    <div className="relative h-10">
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-10 py-1 bg-white text-black border border-black rounded-full font-medium text-sm transition-transform transition-shadow duration-200 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg z-10"
                            onClick={() => decreaseCartQtd(sku)}
                        >
                            -
                        </button>
                        <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-sm font-medium">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-10 py-1 bg-white text-black border border-black rounded-full font-medium text-sm transition-transform transition-shadow duration-200 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg"
                            onClick={() => increaseCartQtd(sku)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}