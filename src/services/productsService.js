
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
  
  