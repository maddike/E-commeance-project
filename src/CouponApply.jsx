import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "./Store"; // import correct action

function CouponApply() {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();

  const applyCouponHandler = () => {
    dispatch(applyCoupon(couponCode));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button onClick={applyCouponHandler}>Apply Coupon</button>
    </div>
  );
}

export default CouponApply;
