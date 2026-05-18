import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addToCart,
  decreaseQuantity,
} from "../store/cartSlice";

import {
  auth,
} from "../firebase/firebase";

import Navbar from "../components/Navbar";

import LoginModal from "../components/LoginModal";

import api from "../services/api";

import { motion } from "framer-motion";

export default function ProductDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [product, setProduct] =
    useState(null);

  const [user, setUser] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    api.get(`/products/${id}`)
      .then((res) => {

        setProduct(res.data);

      })
      .catch((err) =>
        console.log(err)
      );

  }, [id]);

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged(
        (currentUser) => {

          setUser(currentUser);

        }
      );

    return () => unsubscribe();

  }, []);

  if (!product) {

    return (
      <div className="loading">
        Loading Product...
      </div>
    );
  }

  const existingItem =
    cartItems.find(
      (item) =>
        item.id === product.id
    );

  const handleAddToCart = () => {

    if (!user) {

      setShowModal(true);

      return;
    }

    dispatch(addToCart(product));
  };

  return (

    <div className="page">

      <Navbar />

      <motion.div
        className="pdp"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <div className="pdp-image">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>

        <div className="pdp-content">

          <p className="pdp-category">
            {product.category}
          </p>

          <h1>
            {product.title}
          </h1>

          <p className="pdp-description">
            {product.description}
          </p>

          <div className="pdp-price">
            ${product.price}
          </div>

          {existingItem ? (

            <div className="quantity-box">

              <button
                onClick={() =>
                  dispatch(
                    decreaseQuantity(
                      product.id
                    )
                  )
                }
              >
                −
              </button>

              <span>
                {existingItem.quantity}
              </span>

              <button
                onClick={handleAddToCart}
              >
                +
              </button>

            </div>

          ) : (

            <button
              className="primary-btn"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

          )}

        </div>

      </motion.div>

      <LoginModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
      />

    </div>
  );
}