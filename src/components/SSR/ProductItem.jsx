import Link from "next/link";

function ProductItem({ image, name, link, rating, price, oldPrice }) {
    return (
      <div className="single-wid-product">
        <a href={link}>
          <img 
            src={image} 
            className="product-thumb" 
            style={{ width: 'auto', height: 'auto' }}

          />
        </a>
        <h2>
          <a href={link}>{name}</a>
        </h2>
        <div className="product-wid-rating">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa fa-star ${i < rating ? "" : "text-muted"}`} />
          ))}
        </div>
        <div className="product-wid-price">
          <ins>${price}</ins> {oldPrice && <del>${oldPrice.toFixed(2)}</del>}
        </div>
      </div>
    );
  }
  
  export default ProductItem;
  