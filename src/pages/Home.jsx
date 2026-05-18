import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";

import Hero from "../components/Hero";

import ProductCard from "../components/ProductCard";

import LoginModal from "../components/LoginModal";

export default function Home() {

  const [products, setProducts] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    api.get("/products")
      .then((res) => {

        setProducts(
          res.data.products
        );

      })
      .catch((err) =>
        console.log(err)
      );

  }, []);

  return (

    <div className="page">

      <Navbar />

      <Hero />

      <div className="grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            openLoginModal={() =>
              setShowModal(true)
            }
          />

        ))}

      </div>

      <LoginModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
      />

    </div>
  );
}