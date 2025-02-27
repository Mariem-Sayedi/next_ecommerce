"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FileAriane from "@/components/FileAriane";
import Image from "next/image";
import OtherBrand from "@/components/OtherBrand";

const categoryMapping = {
  100: "Apple",
  c200: "Samsung",
  c300: "LG",
  c400: "Huawei",
  c500: "Sony",

};

const ProductDetails = () => {
  const { id: categoryId, productId } = useParams(); 
  const categoryName = categoryMapping[categoryId] || "Inconnu";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);
        const products = await response.json();
        const productData = products.find((p) => p.id === productId);

        if (productData) {
          setProduct(productData);
        } else {
          setError("Produit non trouvé");
        }
      } catch (error) {
        setError("Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <p>Chargement des détails du produit...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Produit non trouvé.</p>;

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
                <ins>${product.price}</ins> 
                {product.oldPrice && <del>${product.oldPrice}</del>}
              </div>

              <button className="add_to_cart_button">
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
      <div className="row">
  <div className="col-sm-6">
    <OtherBrand />
  </div>
</div>

    </div>
  );
};

export default ProductDetails;
