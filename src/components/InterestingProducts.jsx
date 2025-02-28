'use client';
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/cartSlice"; // Assurez-vous d'importer correctement votre action

const InterestingProducts = () => {
  const dispatch = useDispatch();

  // Fonction pour gérer l'ajout au panier
  const handleAddToCart = (product) => {
    const productWithQty = { ...product, qty: 1 }; // Ajouter une quantité par défaut
    dispatch(addItemToCart(productWithQty)); // Ajouter au panier via Redux
  };

  return (
    <div className="cross-sells">
      <h2>You may be interested in...</h2>
      <ul className="products">
        <li className="product">
          <a href="single-product.html">
            <img
              width="325"
              height="325"
              alt="T_4_front"
              className="attachment-shop_catalog wp-post-image"
              src="img/product-2.jpg"
            />
            <h3>Ship Your Idea</h3>
            <span className="price">
              <span className="amount">20.00 €</span>
            </span>
          </a>

          <button
            className="add_to_cart_button"
            onClick={() =>
              handleAddToCart({ id: 23, name: "Ship Your Idea", price: 20.00 })
            }
          >
            Add to Cart
          </button>
        </li>

        <li className="product">
          <a href="single-product.html">
            <img
              width="325"
              height="325"
              alt="T_4_front"
              className="attachment-shop_catalog wp-post-image"
              src="img/product-4.jpg"
            />
            <h3>Ship Your Idea</h3>
            <span className="price">
              <span className="amount">20.00 €</span>
            </span>
          </a>

          <button
            className="add_to_cart_button"
            onClick={() =>
              handleAddToCart({ id: 22, name: "Ship Your Idea", price: 20.00 })
            }
          >
            Add to Cart
          </button>
        </li>
      </ul>
    </div>
  );
};

export default InterestingProducts;
