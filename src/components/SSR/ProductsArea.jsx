
import ServerProductWidget from "./productWidget/ServerProductWidget";
import RecentlyViewed from "../CSR/RecentlyViewed";

function ProductsArea() {
  return (
    <div className="product-widget-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row product-row">
          <ServerProductWidget title="Top Sellers" apiUrl="http://localhost:3000/top-sellers-products" />
          <RecentlyViewed />
          <ServerProductWidget title="Top New" apiUrl="http://localhost:3000/top-new-products" />
        </div>
      </div>
    </div>
  );
}

export default ProductsArea;
