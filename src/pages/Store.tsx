import { useState, useEffect } from "react";
import rawItems from "../data/products.json";
import { StoreItem } from "../components/StoreItem";

export const storeItems = rawItems.map(item => ({
    ...item,
    price: parseFloat(item.price),
  }));

interface StoreProps {
    searchTerm: string;
    termFilter: string;
    sectionFilter: string;
}

export function Store( { searchTerm, termFilter, sectionFilter }: StoreProps) {
    const [displayItems, setDisplayItems] = useState(storeItems);

    useEffect(() => {
        const timer = setTimeout(() => {
            const q = searchTerm.toLowerCase();
            setDisplayItems(
                storeItems.filter(item => 
                    (
                    item.name.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q) ||
                    item.terms.toLowerCase().includes(q)
                    )
                    && (termFilter === "" || item.terms === termFilter)
                    // filtra por sectionFilter
                    && (sectionFilter === "" || item.section === sectionFilter)
                )
                
            );
        }, 100);
        return () => clearTimeout(timer);
    }, [searchTerm, termFilter, sectionFilter]);

    return (
        <>
        <div className="container mx-auto px-4 pt-[10px] mt-6">
            <div className="grid grid-cols-[repeat(auto-fit,260px)] justify-center gap-10">
                {displayItems.map(item =>(
                    <div key={item.sku}>
                        <StoreItem
                        sku={item.sku}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        currency={item.currency}
                        terms={item.terms}
                        section={item.section}
                        image_downloads={item.image_downloads}
                        />
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}