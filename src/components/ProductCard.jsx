import { motion } from "framer-motion";

import {
  useNavigate,
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

import {
  useEffect,
  useState,
} from "react";

export default function ProductCard({

  product,
  openLoginModal,

}) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged(
        (currentUser) => {

          setUser(currentUser);

        }
      );

    return () => unsubscribe();

  }, []);

  const existingItem =
    cartItems.find(
      (item) =>
        item.id === product.id
    );

  const handleAddToCart = (e) => {

  e.stopPropagation();

  if (!user) {

    alert(
      "Please login to access the cart."
    );

    return;
  }

  dispatch(addToCart(product));
};

  return (

    <motion.div
      className="card"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
        y: -6,
      }}
    >

      <img
        src={product.thumbnail}
        alt={product.title}
        onClick={() =>
          navigate(
            `/product/${product.id}`
          )
        }
      />

      <h2>
        {product.title}
      </h2>

      <p>
        ${product.price}
      </p>

      {existingItem ? (

        <div
          className="quantity-box"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <button
            onClick={(e) => {

              e.stopPropagation();

              dispatch(
                decreaseQuantity(
                  product.id
                )
              );

            }}
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

    </motion.div>
  );
}