import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import ProductDetails
  from "./pages/ProductDetails";

import CartPage
  from "./pages/CartPage";

import AdobeTracker
  from "./services/AdobeTracker";

export default function App() {

  return (

    <>

      <AdobeTracker />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails />
          }
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

      </Routes>

    </>

  );
}