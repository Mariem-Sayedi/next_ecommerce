'use client';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateQuantity } from "@/store/cartSlice"; 
import Image from "next/image";
import FileAriane from "@/components/SSR/FileAriane";
import OtherBrand from "@/components/SSR/OtherBrand";
import RecentlyViewed from "@/components/CSR/RecentlyViewed";
import { useState, useEffect } from "react";
import { addToRecentlyViewed } from "@/services/productsService"; // Assure-toi que cette fonction est bien importée

const ClientProductDetails = ({ product, categoryId }) => {
  const dispatch = useDispatch();

  const categoryMapping = {
    100: "Apple",
    c200: "Samsung",
    c300: "LG",
    c400: "Huawei",
    c500: "Sony",
  };

  // récupérer le state du panier depuis Redux
  const cart = useSelector((state) => state.cart.items);

  // trouver la quantité du produit dans le panier
  const productInCart = cart.find(item => item.id === product.id);
  const initialQuantity = productInCart ? productInCart.qty : 1;

  const [quantity, setQuantity] = useState(initialQuantity); // État local pour gérer la quantité

  const categoryName = categoryMapping[categoryId] || "Inconnu";

  const handleAddToCart = (product) => {
    const productWithQty = { ...product, qty: quantity };
    dispatch(addItemToCart(productWithQty));  
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQty => prevQty + 1); 
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1); 
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); 
    setQuantity(value);
  };

  // ajout au cookie "recentlyViewed" après que le composant soit consulté
  useEffect(() => {
    addToRecentlyViewed(product.id);
  }, [product.id]); 

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 d-flex flex-column justify-content-between">
          <RecentlyViewed />
          <OtherBrand categoryId={categoryId} />
        </div>

        <div className="col-md-4">
          <FileAriane product={product} categoryName={categoryName} />
          <div className="product-images">
            <div className="product-main-img">
              <Image
                src={`/img/produts-img/${categoryName}/${product.imageName}`}
                width={150}
                height={150}
                alt={product.name}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div className="product-gallery">
              <Image src="/img/product-thumb-1.jpg" width={50} height={50} alt="Thumbnail 1" style={{ width: 'auto', height: 'auto' }} />
              <Image src="/img/product-thumb-2.jpg" width={50} height={50} alt="Thumbnail 2" style={{ width: 'auto', height: 'auto' }} />
              <Image src="/img/product-thumb-3.jpg" width={50} height={50} alt="Thumbnail 3" style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="product-inner">
            <h2 className="product-name">{product.name}</h2>
            <div className="product-inner-price">
              <ins>{product.price}$</ins>
              {product.oldPrice && <del>{product.oldPrice}$</del>}
            </div>

            <div className="quantity-control">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
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
