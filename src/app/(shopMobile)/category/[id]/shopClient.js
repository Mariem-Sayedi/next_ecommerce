
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryTitle from "@/components/SSR/CategoryTitle";
import ProductShop from "@/components/SSR/ProductShop";
import Pagination from "@/components/CSR/Pagination";

const ShopClient = ({ category, allProducts }) => {
  const [categoryTitle, setCategoryTitle] = useState(category.name);
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const [productsPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(Math.ceil(allProducts.length / productsPerPage)); // Total des pages

  useEffect(() => {
    const offset = currentPage * productsPerPage;
    const paginatedProducts = allProducts.slice(offset, offset + productsPerPage);
    setProducts(paginatedProducts);
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); 
  };

  return (
    <div>
      <CategoryTitle categoryTitle={categoryTitle} />

      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            {loading ? (
              <p>Chargement des produits...</p>
            ) : products.length > 0 ? (
              products.map((product) => {
                const priceAfterDiscount = product.price * (1 - product.discountRate / 100);
                return (
                  <div key={product.id} className="col-md-3 col-sm-6">
                    <Link href={`/category/${category.id}/productDetails/${product.id}`} passHref>
                      <ProductShop
                        image={`/img/produts-img/${category.name}/${product.imageName}`}
                        name={product.name}
                        rating={product.review}
                        price={priceAfterDiscount.toFixed(2)}
                        oldPrice={product.price.toFixed(2)}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>Aucun produit trouvé.</p>
            )}
          </div>

          <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ShopClient;