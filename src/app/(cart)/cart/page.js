'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeItemFromCart, updateQuantity } from '../../../store/cartSlice';
import { useState } from 'react';
import Image from 'next/image';
import InterestingProducts from '@/components/InterestingProducts';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  const [loading, setLoading] = useState(false);

  // Gestion de la quantité
  const handleIncreaseQuantity = (id, qty) => {
    dispatch(updateQuantity({ id, qty: qty + 1 }));
  };

  const handleDecreaseQuantity = (id, qty) => {
    if (qty > 1) {
      dispatch(updateQuantity({ id, qty: qty - 1 }));
    }
  };

  // Suppression d'un produit avec confirmation
  const handleRemoveItem = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      dispatch(removeItemFromCart(id));
    }
  };

  // Gestion du checkout
  const handleCheckout = () => {
    router.push('/checkout');
  };

  // Extraction de la catégorie à partir du nom de l'image
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
                    {/* Table des articles du panier */}
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
                          {cartItems.map((item, index) => {
                            const category = getCategoryFromImage(item.imageName);
                            return (
                              <tr key={`${item.id}-${index}`}>
                                <td>
                                  <Image 
                                    src={`/img/produts-img/${category}/${item.imageName}`} 
                                    width={50} 
                                    height={50} 
                                    loading="lazy" 
                                    alt={item.name}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}$</td>
                                <td>
                                  <button onClick={() => handleDecreaseQuantity(item.id, item.qty)}>-</button>
                                  <input type="number" value={item.qty} readOnly />
                                  <button onClick={() => handleIncreaseQuantity(item.id, item.qty)}>+</button>
                                </td>
                                <td>{(item.price * item.qty).toFixed(2)}$</td>
                                <td>
                                  <button onClick={() => handleRemoveItem(item.id)}>❌</button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <p>Votre panier est vide.</p>
                    )}

                    {/* Totaux du panier */}
                    {cartItems.length > 0 && (
                      <div className="cart-summary">
                        <h3>CART TOTALS</h3>
                        <table className="cart-totals-table">
                          <tbody>
                            <tr>
                              <td>Cart Subtotal</td>
                              <td>{subTotal.toFixed(2)}$</td>
                            </tr>
                            <tr>
                              <td>Shipping</td>
                              <td>0,00$</td>
                            </tr>
                            <tr>
                              <td>Tax</td>
                              <td>{tax.toFixed(2)}$</td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>{total.toFixed(2)}$</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Bouton de checkout */}
                    {cartItems.length > 0 && (
                      <button onClick={handleCheckout} disabled={loading} className="checkout-button">
                        Proceed to Checkout
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Produits intéressants */}
              <InterestingProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
