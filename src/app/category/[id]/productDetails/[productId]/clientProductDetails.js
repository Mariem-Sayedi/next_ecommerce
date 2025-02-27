'use client';
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/cartSlice";  // Importer correctement l'action
import Image from "next/image";
import FileAriane from "@/components/FileAriane";
import OtherBrand from "@/components/OtherBrand";

const categoryMapping = {
  100: "Apple",
  c200: "Samsung",
  c300: "LG",
  c400: "Huawei",
  c500: "Sony",
};

const ClientProductDetails = ({ product, categoryId }) => {
  const dispatch = useDispatch();

  if (!product) return <p>Produit non trouvé.</p>;

  const categoryName = categoryMapping[categoryId] || "Inconnu";

  const handleAddToCart = (product) => {
    const productWithQty = { ...product, qty: 1 };
    dispatch(addItemToCart(productWithQty));  
  };

  return (
    <div className="col-md-8">
      <div className="product-content-right">
        <FileAriane product={product} categoryName={categoryName} />
        <div className="row">
          <div className="col-sm-6">
            <div className="product-images">
              <div className="product-main-img">
                <Image
                  src={`/img/produts-img/${categoryName}/${product.imageName}`}
                  width={150}
                  height={50}
                  alt={product.name}
                />
              </div>
              <div className="product-gallery">
                <Image src="/img/product-thumb-1.jpg" width={50} height={50} alt="Thumbnail 1" />
                <Image src="/img/product-thumb-2.jpg" width={50} height={50} alt="Thumbnail 2" />
                <Image src="/img/product-thumb-3.jpg" width={50} height={50} alt="Thumbnail 3" />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="product-inner">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-inner-price">
                <ins>{product.price}€</ins>
                {product.oldPrice && <del>{product.oldPrice}€</del>}
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
        <OtherBrand categoryId={categoryId} />
      </div>
    </div>
  );
};

export default ClientProductDetails;
