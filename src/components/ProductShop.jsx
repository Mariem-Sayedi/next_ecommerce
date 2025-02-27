import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice";

function ProductShop({ id, image, name, link, rating, price, oldPrice }) {

//   const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price }, 1));
  };
  return (
    <div className="product-item">
      <div className="product-image">
        <a href={link}>
        <Image
          src={image} 
          alt={name} 
          width={200} 
          height={200} 
          loading="lazy" 
        />    
       </a>
      </div>
      <h3>
        <a href={link}>{name}</a>
      </h3>
      <div className="product-price">
        <ins>${price}</ins>
        {oldPrice && <del>${oldPrice}</del>} 
      </div>

      <div className="product-add-to-cart">
      {/* <button className="add_to_cart_button" onClick={handleAddToCart}>
          Add to Cart
        </button> */}
      </div>
    </div>
  );
}

export default ProductShop;
