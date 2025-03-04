'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeItemFromCart, updateQuantity } from '../../../store/cartSlice';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import InterestingProducts from '@/components/CSR/InterestingProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // évite l'hydratation côté serveur
  }, []);

  if (!isClient) return null; // retourne rien avant le montage côté client

  // gestion de la quantité
  const handleIncreaseQuantity = (id, qty) => {
    dispatch(updateQuantity({ id, qty: qty + 1 }));
  };

  const handleDecreaseQuantity = (id, qty) => {
    if (qty > 1) {
      dispatch(updateQuantity({ id, qty: qty - 1 }));
    }
    else 
   { toast.warning("La quantité ne peut pas être inférieure à 1 !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  };

  // suppression d'un produit avec Toastify
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
    toast.warning("Produit supprimé du panier !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // gestion du checkout
  const handleCheckout = () => {
    router.push('/checkout');
  };

  // extraction de la catégorie à partir du nom de l'image
  const getCategoryFromImage = (imageName) => {
    if (!imageName) return 'default';
    const category = imageName.split('-')[0].toLowerCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="cart-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
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
                            <th>Produit</th>
                            <th>Prix Unitaire</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            <th>Supprimer</th>
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
                                    unoptimized={true}  
                                    alt={item.name}
                                    style={{ width: 'auto', height: 'auto' }}
                                    priority={true}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}$</td>
                                <td>
                                  <button onClick={() => handleDecreaseQuantity(item.id, item.qty)}>-</button>
                                  <input value={item.qty} readOnly />
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
                      <div className="empty-cart">Votre panier est vide.</div> 
                    )}

                    {cartItems.length > 0 && (
                      <div className="cart-summary">
                        <h3>TOTAL DU PANIER</h3>
                        <table className="cart-totals-table">
                          <tbody>
                            <tr>
                              <td>Sous-total</td>
                              <td>{subTotal.toFixed(2)}$</td>
                            </tr>
                            <tr>
                              <td>Livraison</td>
                              <td>0,00$</td>
                            </tr>
                            <tr>
                              <td>Taxes</td>
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

                    {cartItems.length > 0 && (
                      <button onClick={handleCheckout} disabled={loading} className="checkout-button">
                        Procéder au paiement
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <InterestingProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
