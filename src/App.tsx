import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>

    </>
  );
}

export default App;
