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
  if (!product || !product.id || !product.price || !product.imageName || !product.name) {
    console.error("Produit invalide : ", product);
    return;
  }

  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

  // Vérifier si le produit est déjà présent
  const isAlreadyStored = viewedProducts.some((p) => p.id === product.id);

  if (!isAlreadyStored) {
    viewedProducts.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      discountRate: product.discountRate || 0,
      imageName: product.imageName,
      review: product.review || 0
    });
  }

  // Limiter à 10 produits
  if (viewedProducts.length > 5) {
    viewedProducts.pop();
  }

};


export const getRecentlyViewedProducts = () => {
  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

  return viewedProducts;
};

