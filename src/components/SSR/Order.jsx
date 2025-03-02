import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Order = () => {
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart && cart.items) {
      setLoading(false);
    }
  }, [cart]);

  if (loading) {
    return <p>Chargement du panier...</p>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div className="order-review">
      <h2>Résumé de la commande</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{parseFloat(item.price).toFixed(2)}$</td>
              <td>{item.qty}</td>
              <td>{parseFloat(item.price * item.qty).toFixed(2)}$</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-totals">
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Sous-total :</strong>
              </td>
              <td>{cart.subTotal?.toFixed(2) || '0.00'}$</td>
            </tr>
            <tr>
              <td>
                <strong>Taxe :</strong>
              </td>
              <td>{cart.tax?.toFixed(2) || '0.00'}$</td>
            </tr>
            <tr>
              <td>
                <strong>Total :</strong>
              </td>
              <td>{cart.total?.toFixed(2) || '0.00'}$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;