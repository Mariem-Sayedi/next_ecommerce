"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { fetchProductsByProductListId } from "@/services/productsService";
import Link from "next/link";

const API_BASE_URL = "http://localhost:3000";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // État pour vérifier si c'est le côté client

  // On vérifie si nous sommes côté client avant d'utiliser useRouter
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Le code est maintenant côté client
    }
  }, []);

  const router = useRouter();
  const { category, productId } = router.query || {}; // Utiliser query directement

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const data = await getProductsByCategory();
          setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
          const selectedCategory = data.find(item => item.name.toLowerCase() === category.toLowerCase());
          setProducts(selectedCategory ? selectedCategory.items : []);
        } catch (error) {
          setError("Erreur de chargement des produits");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [category]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const existingProduct = allProducts.find(p => p.id === productId);
        if (existingProduct) {
          setProduct(existingProduct);
        } else {
          try {
            const data = await fetchProductsByProductListId(productId);
            setProduct(data);
          } catch (error) {
            console.error("Erreur lors de la récupération du produit :", error);
          }
        }
      }
    };

    if (productId) fetchProduct();
  }, [productId, allProducts]);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().startsWith(query)
    );

    setSearchResults(filteredResults);
  };

  if (productId && !product) {
    return <p>Chargement du produit...</p>;
  }

  if (!isClient) {
    return null; // Ne pas rendre quoi que ce soit avant que le composant ne soit monté côté client
  }

  return (
    <div className="search-container">
      <div className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <ul className="results-list">
            {searchResults.map((result) => (
              <li key={result.id} className="result-item">
                <Link
                  href={`/Shop/${category || "all"}/productDetails/${result.id}`}
                  passHref
                >
                  <span>{result.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
