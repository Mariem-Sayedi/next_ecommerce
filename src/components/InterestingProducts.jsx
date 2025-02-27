import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice";


const InterestingProducts = () => {

  const dispatch = useDispatch();

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product, 1));
//   };

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
              handleAddToCart({ id: 23, name: "Another Product", price: 25.00 })
            }
          >
           Cart
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

    <a
      className="add_to_cart_button"
      data-quantity="1"
      data-product_sku=""
      data-product_id="22"
      rel="nofollow"
      href="single-product.html"
    >
       Cart
    </a>
  </li>
</ul>
</div>
 );
};

export default InterestingProducts;