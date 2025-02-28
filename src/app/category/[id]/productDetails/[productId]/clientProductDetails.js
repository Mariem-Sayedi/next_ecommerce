'use client';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateQuantity } from "@/store/cartSlice"; 
import Image from "next/image";
import FileAriane from "@/components/FileAriane";
import OtherBrand from "@/components/OtherBrand";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useState } from "react";

const ClientProductDetails = ({ product, categoryId }) => {
  const dispatch = useDispatch();

  const categoryMapping = {
    100: "Apple",
    c200: "Samsung",
    c300: "LG",
    c400: "Huawei",
    c500: "Sony",
  };

  // Récupérer l'état du panier depuis Redux
  const cart = useSelector((state) => state.cart.items);

  // Trouver la quantité du produit dans le panier
  const productInCart = cart.find(item => item.id === product.id);
  const initialQuantity = productInCart ? productInCart.qty : 1;

  const [quantity, setQuantity] = useState(initialQuantity); // État local pour gérer la quantité

  const categoryName = categoryMapping[categoryId] || "Inconnu";

  const handleAddToCart = (product) => {
    const productWithQty = { ...product, qty: quantity };
    dispatch(addItemToCart(productWithQty));  
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQty => prevQty + 1); // Augmenter la quantité
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1); // Diminuer la quantité
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); // Empêcher les valeurs inférieures à 1
    setQuantity(value);
  };

  return (
    <div className="container">
      <div className="row">
        {/* Première colonne : RecentlyViewed et OtherBrand en bas */}
        <div className="col-md-4 d-flex flex-column justify-content-between">
          <RecentlyViewed />
          <OtherBrand categoryId={categoryId} />
        </div>

        {/* Deuxième colonne : FileAriane et images */}
        <div className="col-md-4">
          <FileAriane product={product} categoryName={categoryName} />
          <div className="product-images">
            <div className="product-main-img">
              <Image
                src={`/img/produts-img/${categoryName}/${product.imageName}`}
                width={150}
                height={150}
                alt={product.name}
                layout="intrinsic"
              />
            </div>
            <div className="product-gallery">
              <Image src="/img/product-thumb-1.jpg" width={50} height={50} alt="Thumbnail 1" />
              <Image src="/img/product-thumb-2.jpg" width={50} height={50} alt="Thumbnail 2" />
              <Image src="/img/product-thumb-3.jpg" width={50} height={50} alt="Thumbnail 3" />
            </div>
          </div>
        </div>

        {/* Troisième colonne : Nom, prix, contrôle quantité, add to cart, description */}
        <div className="col-md-4">
          <div className="product-inner">
            <h2 className="product-name">{product.name}</h2>
            <div className="product-inner-price">
              <ins>{product.price}$</ins>
              {product.oldPrice && <del>{product.oldPrice}$</del>}
            </div>

            {/* Bloc de contrôle de la quantité */}
            <div className="quantity-control">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: "50px", textAlign: "center" }}
              />
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>

            <button className="add_to_cart_button" onClick={() => handleAddToCart(product)}>
              Add to cart
            </button>

            <div className="product-inner-category">
              <h2>Product Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProductDetails;
