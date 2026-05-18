import Navbar from "../components/Navbar";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  removeFromCart,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
    const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (

    <div className="page">

      <Navbar />

      <div className="cart-layout">

        {/* LEFT SIDE */}

        <div className="cart-left">

          <h1>
            Your Cart
          </h1>

          <p className="cart-subtitle">
            Financial decisions were made.
          </p>

          {cartItems.length === 0 ? (

           <div className="empty-cart">

  <h2>
    Your Cart Feels Emotionally Empty
  </h2>

  <p>
    Fortunately, we have 30 completely
    unnecessary products available
    to help fill the void.
  </p>

  <button
    onClick={() => navigate("/")}
  >
    Continue Shopping
  </button>

</div>

          ) : (

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="cart-item"
                >

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  <div className="cart-item-info">

                    <h2>
                      {item.title}
                    </h2>

                    <p>
                      ${item.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* RIGHT SIDE */}


         {cartItems.length > 0 && (

  <div className="cart-summary">

    <p className="summary-label">
      CART SUMMARY
    </p>

    <h2>
      ${totalPrice.toFixed(2)}
    </h2>

    <div className="summary-row">

      <span>
        Items
      </span>

      <span>
        {totalItems}
      </span>

    </div>

    <div className="summary-row">

      <span>
        Shipping
      </span>

      <span>
        Emotionally expensive
      </span>

    </div>

    <div className="summary-total">

      <span>Total</span>

      <span>
        ${totalPrice.toFixed(2)}
      </span>

    </div>

    <button className="checkout-btn">

      Proceed to Checkout

    </button>

    <p className="summary-joke">

      By continuing, you agree to
      absolutely ignore your savings goals.

    </p>

  </div>

)}

      </div>
          

    </div>
  );
}