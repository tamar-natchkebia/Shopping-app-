import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import CartProvider from "./context/CartProvider.jsx";

import { AuthProvider } from "./context/AuthProvider.jsx";
import WishlistProvider from "./context/WishlistProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);