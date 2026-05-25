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
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

      </Routes>

    </>
  );
}