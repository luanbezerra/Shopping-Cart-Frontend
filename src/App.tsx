import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { Navbar } from './components/Navbar';
import { Store } from './pages/Store';
import { ProductView } from './pages/ProductView';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { Checkout } from './pages/Checkout';

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [termFilter, setTermFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  return (
    <ShoppingCartProvider>
       <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        termFilter={termFilter}
        setTermFilter={setTermFilter}
        sectionFilter={sectionFilter}
        setSectionFilter={setSectionFilter}
      />
        <Routes>
          <Route path="/" element={<Store searchTerm={searchTerm} termFilter={termFilter} sectionFilter={sectionFilter}/>} />
          <Route path="/product/:sku" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      
    </ShoppingCartProvider>
  )
}

export default App 
 