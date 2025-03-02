"use client";

import { useState } from "react";
import ProductItem from "../ProductItem";

function getCategoryFromImage(imageName) {
  const category = imageName.split("-")[0].toLowerCase();
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function ProductWidgetClient({ title, products }) {
  const [showAll, setShowAll] = useState(false);

  const handleViewAllClick = () => {
    setShowAll(!showAll);
  };

  const productsToDisplay = showAll ? products : products.slice(0, 2);

  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        <h2 className="product-wid-title">{title}</h2>

        <button
          type="button"
          className="btn wid-view-more"
          onClick={handleViewAllClick}
        >
          {showAll ? "View Less" : "View All"}
        </button>

        {products.length > 0 ? (
          productsToDisplay.map((product) => {
            const category = getCategoryFromImage(product.imageName);

            return (
              <ProductItem
                key={product.id}
                image={`/img/produts-img/${category}/${product.imageName}`}
                name={product.name}
                link={`single-product/${product.id}`}
                rating={product.review}
                price={product.price}
                oldPrice={
                  product.price + product.price * (product.discountRate / 100)
                }
              />
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
