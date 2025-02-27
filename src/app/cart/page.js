'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeItemFromCart, updateQuantity } from '../../store/cartSlice';
import { useState } from 'react';
import InterestingProducts from '@/components/InterestingProducts';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  const [loading, setLoading] = useState(false);

  const handleIncreaseQuantity = (id, qty) => {
    dispatch(updateQuantity({ id, qty: qty + 1 }));
  };

  const handleDecreaseQuantity = (id, qty) => {
    if (qty > 1) {
      dispatch(updateQuantity({ id, qty: qty - 1 }));
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const getCategoryFromImage = (imageName) => {
    if (!imageName) return 'default';
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
                                  <img 
                                    src={`/img/products-img/${category}/${item.imageName}`} 
                                    width="50" 
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
                                  <button onClick={() => dispatch(removeItemFromCart(item.id))}>❌</button>
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
                              <td>{subTotal.toFixed(2)}€</td>
                            </tr>
                            <tr>
                              <td>Shipping</td>
                              <td>0,00€</td>
                            </tr>
                            <tr>
                              <td>Tax</td>
                              <td>{tax.toFixed(2)}€</td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>{total.toFixed(2)}€</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button onClick={handleCheckout} disabled={loading} className="checkout-button">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InterestingProducts />
      </div>
    </div>
  );
};

export default Cart;
