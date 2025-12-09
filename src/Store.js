import { createSlice, configureStore } from "@reduxjs/toolkit";

// ===== Cart Slice =====
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    decreaseQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else return state.filter(i => i.id !== action.payload.id);
    },
    removeFromCart: (state, action) =>
      state.filter(i => i.id !== action.payload.id),
    clearCart: () => [],
  },
});

// Export cart actions
export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;

// ===== Coupon Slice =====
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discountPercentage: 0,
    applied: false,
    message: "",
  },
  reducers: {
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();
      const coupons = { DISCOUNT10: 10, DISCOUNT20: 20, DISCOUNT30: 30, ENTERCODE: 10 };

      if (coupons[code]) {
        state.code = code;
        state.discountPercentage = coupons[code];
        state.applied = true;
        state.message = `Coupon Applied! ${coupons[code]}% OFF`;
      } else {
        state.code = "";
        state.discountPercentage = 0;
        state.applied = false;
        state.message = "Invalid Coupon!";
      }
    },
    clearCoupon: (state) => {
      state.code = "";
      state.discountPercentage = 0;
      state.applied = false;
      state.message = "";
    },
  },
});

// Export coupon actions
export const { applyCoupon, clearCoupon } = couponSlice.actions;

// ===== Store =====
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
  },
});

export default store;
