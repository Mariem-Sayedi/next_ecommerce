"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { fetchProductsByProductListId } from "@/services/productsService";

const API_BASE_URL = "http://localhost:3000";

const categoryMapping = {
  100: "Apple",
  c200: "Samsung",
  c300: "LG",
  c400: "Huawei",
  c500: "Sony",
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  const searchResultsRef = useRef(null); // Référence à la liste de résultats
  const router = useRouter();
  const pathname = usePathname();  // Utilisation de usePathname pour détecter les changements de route
  const { category: categoryName, productId } = router.query || {};

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products`);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setProductsLoading(false);
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

  useEffect(() => {
    if (categoryName) {
      const mappedName = categoryMapping[categoryName] || "Inconnu";
      setCategory({ id: categoryName, name: mappedName });
    } else {
      setCategory({ id: "c200", name: "Samsung" });
    }
  }, [categoryName]);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    if (allProducts.length === 0) {
      return;
    }

    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().startsWith(query)
    );

    setSearchResults(filteredResults);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      router.push(`/category/${category?.id || "c200"}/productDetails/${searchResults[0].id}`);
    }
  };

  const handleClickOutside = (e) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleProductClick = (productId) => {
    setSearchResults([]);
    router.push(`/category/${category?.id || "c200"}/productDetails/${productId}`);
  };

  // Réinitialiser l'input de recherche quand on quitte la page de détails produit
  useEffect(() => {
    if (pathname.includes("productDetails")) {
      setSearchQuery(""); // Réinitialiser la recherche quand la page de détails est atteinte
    }
  }, [pathname]);  // Reagir aux changements de chemin

  if (!isClient) {
    return null;
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
          onKeyDown={handleKeyPress}
        />
        <input type="button" value="Search"></input>
      </div>

      {searchQuery && searchResults.length === 0 && !productsLoading && (
        <p className="no-results"> </p>
      )}

      {searchResults.length > 0 && (
        <div className="search-results" ref={searchResultsRef}>
          <ul className="results-list">
            {searchResults.map((result) => (
              <li key={result.id} className="result-item" onClick={() => handleProductClick(result.id)}>
                <span>{result.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {productsLoading && <p>Chargement des produits...</p>}
    </div>
  );
};

export default Search;
