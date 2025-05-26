import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { Navbar } from './components/Navbar';
import { Store } from './pages/Store';
import { ProductView } from './pages/ProductView';
import { Cart } from './pages/Cart';
import { About } from './pages/About';

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ShoppingCartProvider>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Store searchTerm={searchTerm}/>} />
          <Route path="/product/:sku" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      
    </ShoppingCartProvider>
  )
}

export default App 
 