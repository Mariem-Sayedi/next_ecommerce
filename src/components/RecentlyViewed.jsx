"use client";

import { useState, useEffect } from "react";
import ProductItem from "@/components/ProductItem";
import Link from "next/link";
import { getRecentlyViewedProducts } from "@/services/productsService";

const getCategoryFromImage = (imageName) => {
  if (!imageName) return "Unknown";
  const category = imageName.split("-")[0].toLowerCase();
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const products = await getRecentlyViewedProducts();
        setRecentlyViewed(products);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits récemment consultés :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  const handleViewAllClick = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="single-product-widget">
      <h2 className="product-wid-title">Recently Viewed</h2>

      {loading ? (
        <p>Loading...</p>
      ) : recentlyViewed.length === 0 ? (
        <p>No recently viewed products</p>
      ) : (
        <>
          {(showAll ? recentlyViewed : recentlyViewed.slice(0, 2)).map((product) => {
            const category = getCategoryFromImage(product.imageName);

            return (
              <ProductItem
                key={product.id}
                image={`/img/produts-img/${category}/${product.imageName}`}
                name={product.name}
                link={`/category/${category}/productDetails/${product.id}`}
                rating={product.review}
                price={product.price}
                oldPrice={product.price + product.price * (product.discountRate / 100)}
              />
            );
          })}

          {recentlyViewed.length > 2 && (
            <button 
              type="button" 
              className="btn wid-view-more"
              onClick={handleViewAllClick}
            >
              {showAll ? 'View Less' : 'View All'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RecentlyViewed;
