// app/category/[id]/productDetails/[productId]/page.js
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductDetails = ({ params }) => {
  const { id, productId } = params; // Extraction de `id` (catégorie) et `productId` (produit) depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);
        const products = await response.json();
        const productData = products.find((product) => product.id === productId);

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

  if (loading) {
    return <p>Chargement des détails du produit...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!product) {
    return <p>Produit non trouvé.</p>;
  }

  // Calcul du prix après réduction
  const priceAfterDiscount = product.price * (1 - product.discountRate / 100);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={`/img/products-img/${product.imageName}`} alt={product.name} className="img-fluid" loading="lazy" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted">Prix: </span>
              <span className="text-decoration-line-through">{product.price}€</span>
              <span className="text-danger ms-2">{priceAfterDiscount.toFixed(2)}€</span>
            </div>
            <div>
              <span className="badge bg-warning">{product.review} ★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
