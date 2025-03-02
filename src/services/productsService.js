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

export const addToRecentlyViewed = (productId) => {
  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

  if (!viewedProducts.includes(productId)) {
    viewedProducts.unshift(productId);
  }

  if (viewedProducts.length > 10) {
    viewedProducts.pop();
  }

  Cookies.set("recentlyViewed", JSON.stringify(viewedProducts), { expires: 7 });

};

export const getRecentlyViewedProducts = async (getAll = false) => {
  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];



  if (viewedProducts.length === 0) return [];

  const productDetails = await Promise.all(
    viewedProducts.map(async (id) => {
      const product = await getProductById(id);
      return product;
    })
  );

  return getAll ? productDetails : productDetails.slice(0, 3);
};
