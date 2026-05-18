import {
  createSlice,
} from "@reduxjs/toolkit";

const savedCart =
  localStorage.getItem("cart");

const initialState = {
  items: savedCart
    ? JSON.parse(savedCart)
    : [],
};

const saveCart = (items) => {

  localStorage.setItem(
    "cart",
    JSON.stringify(items)
  );
};

const cartSlice = createSlice({

  name: "cart",

  initialState,

  reducers: {

    addToCart: (state, action) => {

      const existingItem =
        state.items.find(
          (item) =>
            item.id === action.payload.id
        );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCart(state.items);
    },

    decreaseQuantity: (
      state,
      action
    ) => {

      const item =
        state.items.find(
          (item) =>
            item.id === action.payload
        );

      if (!item) return;

      if (item.quantity > 1) {

        item.quantity -= 1;

      } else {

        state.items =
          state.items.filter(
            (i) =>
              i.id !== action.payload
          );
      }

      saveCart(state.items);
    },

    removeFromCart: (
      state,
      action
    ) => {

      state.items =
        state.items.filter(
          (item) =>
            item.id !== action.payload
        );

      saveCart(state.items);
    },

  },

});

export const {

  addToCart,
  decreaseQuantity,
  removeFromCart,

} = cartSlice.actions;

export default cartSlice.reducer;