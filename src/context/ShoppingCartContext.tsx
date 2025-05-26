import { createContext, useContext, useState } from "react";

type ShoppingCartProviderProps = {
    children: React.ReactNode;
}

export type ShoppingCartContextType = {
    getItemQtd: (sku: string) => number;
    increaseCartQtd: (sku: string) => void;
    decreaseCartQtd: (sku: string) => void;
    removeFromCart: (sku: string) => void;
    cartQuantity: number;
    cartItems: CartItem[];
}

type CartItem = {
    sku: string;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

    const[cartItems, setCartItems] = useState<CartItem[]>([])
    const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    function getItemQtd(sku: string) {
        return cartItems.find(item => item.sku === sku)?.quantity || 0;
    }

    function increaseCartQtd(sku: string) {
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.sku === sku);
            if (existing == null) {
                return [...prevItems, { sku, quantity: 1 }];
            }
            else{
                return prevItems.map(item => {
                    if (item.sku === sku) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQtd(sku: string) {
        setCartItems(prevItems => {
            if (prevItems.find(item => item.sku === sku)?.quantity === 1) {
                return prevItems.filter(item => item.sku !== sku);
            } else {
                return prevItems.map(item => {
                    if (item.sku === sku) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    } 
                })
            }
        })
    }

    function removeFromCart(sku: string) {
        setCartItems(prevItems => {
            return prevItems.filter(item => item.sku !== sku)
        });
    }

    return (
        <ShoppingCartContext.Provider 
            value={{
                getItemQtd,
                increaseCartQtd,
                decreaseCartQtd,
                removeFromCart,
                cartQuantity,
                cartItems,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}