

const API_URL = "http://localhost:3000/products-lists";

// Fonction qui récupère les catégories côté serveur
export async function getCategories() {
    try {
      const response = await fetch("http://localhost:3000/categories", { cache: "no-store" }); //  Pas de cache pour SSR
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        console.error("Données de catégories invalides :", data);
        return [];
      }
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      return [];
    }
  }

  export const getCategoryFromImage = (imageName) => {
    if (!imageName) return "Unknown";
    const category = imageName.split("-")[0].toLowerCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  