import { addItemToCart } from "@/store/cartSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

function ProductShop({ id, image, name, link, rating, price, oldPrice }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productWithQty = { id, image, name, price, qty: 1 };
    dispatch(addItemToCart(productWithQty));
  };

  return (
    <div className="product-item">
      <div className="product-image">
        {/* <Link href={link}> */}
          <Image src={image} alt={name} width={200} height={200} loading="lazy" style={{ width: 'auto', height: 'auto' }}/>
:      </div>
      <h3>
        {name}
      </h3>
      <div className="product-price">
        <ins>${price}</ins>
        {oldPrice && <del>${oldPrice}</del>}
      </div>
      <br></br>
      <div className="product-add-to-cart">
        <button className="add_to_cart_button" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
      <br></br>
    </div>
    
  );
}

export default ProductShop;
