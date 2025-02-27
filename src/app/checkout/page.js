"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Remplacement de useNavigate
import CategoryTitle from "@/components/CategoryTitle";
import BillingDetails from "@/components/BillingDetails";
import ShipDetails from "@/components/ShipDetails";
import Order from "@/components/Order";
import Payment from "@/components/Payment";
import { clearCart } from "@/store/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Utilisation de useRouter

  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const orderData = {
    total,
    subTotal,
    tax,
    items: cartItems.map(({ id, name, imageName, price, qty }) => ({
      id,
      name,
      imageName,
      price,
      qty,
    })),
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order");

      setOrderPlaced(true);
      dispatch(clearCart());
      router.push("/"); 

    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <CategoryTitle categoryTitle="Checkout" />
      <div className="single-product-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-content-right">
                <div className="woocommerce">
                  <div className="col2-set" id="customer_details">
                    <BillingDetails />
                    <ShipDetails />
                  </div>

                  <h3 id="order_review_heading">Your order</h3>
                  <div id="order_review" style={{ position: "relative" }}>
                    <Order />
                    <Payment />
                    <div className="form-row place-order">
                      <button
                        className="button alt"
                        id="place_order"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>

                  {orderPlaced && (
                    <div className="order-success-message">
                      Order placed successfully!
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
