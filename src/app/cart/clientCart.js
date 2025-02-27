"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";  
import Image from "next/image";
import InterestingProducts from "@/components/InterestingProducts";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";

const CartClient = ({ taxRate, discount }) => {
  const dispatch = useDispatch();
  const router = useRouter();  
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calcul des totaux avec les données SSR
  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subTotal * taxRate;
  const total = subTotal + tax - discount;

  const handleIncreaseQuantity = (id, qty) => {
    dispatch(updateQuantity({ id, qty: qty + 1 }));
  };

  const handleDecreaseQuantity = (id, qty) => {
    if (qty > 1) {
      dispatch(updateQuantity({ id, qty: qty - 1 }));
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");  
  };

  const getCategoryFromImage = (imageName) => {
    if (!imageName) return "default";
    const category = imageName.split('-')[0].toLowerCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };


  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="single-product-area">
          <div className="zigzag-bottom"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-content-right">
                  <div className="woocommerce">
                    {cartItems.length > 0 ? (
                      <table className="shop_table cart">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Unit price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => {
                            const category = getCategoryFromImage(item.imageName);
                            return (
                              <tr key={item.id}>
                                <td>
                                  <Image 
                                    src={`/img/produts-img/${category}/${item.imageName}`}
                                    width={50} 
                                    height={50}
                                    alt={item.name}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}€</td>
                                <td>
                                  <button onClick={() => handleDecreaseQuantity(item.id, item.qty)}>-</button>
                                  <input type="number" value={item.qty} readOnly style={{ width: "50px", textAlign: "center" }} />
                                  <button onClick={() => handleIncreaseQuantity(item.id, item.qty)}>+</button>
                                </td>
                                <td>{(item.price * item.qty).toFixed(2)}€</td>
                                <td>
                                  <button onClick={() => dispatch(removeFromCart(item.id))}>❌</button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <p>Votre panier est vide.</p>
                    )}

                    <div className="cart-summary-container" style={{ display: "flex", justifyContent: "space-between", marginLeft: "40px" }}>
                      <div className="cart-totals-container" style={{ flex: 1, maxWidth: "45%" }}>
                        <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>CART TOTALS</h3>
                        <table className="cart-totals-table">
                          <tbody>
                            <tr>
                              <td>Cart Subtotal</td>
                              <td>{subTotal.toFixed(2)} €</td>
                            </tr>
                            <tr>
                              <td>Taxe ({(taxRate * 100).toFixed(0)}%)</td>
                              <td>{tax.toFixed(2)} €</td>
                            </tr>
                            <tr>
                              <td>Discount</td>
                              <td>-{discount.toFixed(2)} €</td>
                            </tr>
                            <tr>
                              <td><strong>Order Total</strong></td>
                              <td><strong>{total.toFixed(2)} €</strong></td>
                            </tr>
                          </tbody>
                        </table>
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                      </div>
                      <div className="interesting-products-container" style={{ flex: 1, marginLeft: "20px", position: "relative", maxWidth: "30%" }}>
                        <InterestingProducts />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default CartClient;
