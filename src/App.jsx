import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (
      window.adobe?.target?.triggerView
    ) {
      window.adobe.target.triggerView(
        location.pathname
      );

      console.log(
        "Adobe Target View Triggered:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />
    </Routes>
  );
}