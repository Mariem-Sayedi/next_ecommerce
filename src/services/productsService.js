import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:3000";

export const fetchProductsByProductListId = async (productListId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products-lists/${productListId}`);
    const productsData = await response.json();
    return productsData.items;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!res.ok) throw new Error("Produit non trouvé");

    const product = await res.json();
    return product;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${productId}:`, error);
    return null;
  }
};




export const addToRecentlyViewed = (product) => {
  if (typeof document === "undefined") return; // Évite les erreurs en SSR

  let viewedProducts = JSON.parse(Cookies.get("recentlyViewed") || "[]");

  // Supprime l'ancien si déjà présent (évite les doublons)
  viewedProducts = viewedProducts.filter((p) => p.id !== product.id);
  viewedProducts.unshift(product); // Ajoute en première position

  if (viewedProducts.length > 3) {
    viewedProducts.pop(); // Garde seulement les 3 derniers
  }

  Cookies.set("recentlyViewed", JSON.stringify(viewedProducts), { expires: 7 });
};

export const getRecentlyViewedProducts = () => {
  if (typeof document === "undefined") return [];

  return JSON.parse(Cookies.get("recentlyViewed") || "[]");
};

