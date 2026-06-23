import React from 'react';
import App from "./App";
import ReactDOM from "react-dom/client";
import CartProvider from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <CartProvider>

    <App />
        </CartProvider>

  </React.StrictMode>
);

