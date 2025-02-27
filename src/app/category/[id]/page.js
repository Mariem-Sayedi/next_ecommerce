// app/shop/[id]/page.js

import { fetchProductsByProductListId } from "@/services/productsService";
import { getCategories } from "@/services/categoriesService";
import ShopClient from "./ShopClient"; // Composant côté client

export const revalidate = 60; // Optionnel : durée de revalidation pour la mise à jour des données côté serveur.

export async function generateMetadata({ params }) {
  const { id } = params;

  const categories = await getCategories();
  const selectedCategory = categories.find((category) => category.id === id);

  if (!selectedCategory) {
    return {
      title: "Catégorie non trouvée",
    };
  }

  return {
    title: selectedCategory.name,
    description: `Produits disponibles dans la catégorie ${selectedCategory.name}`,
  };
}

export default async function ShopPage({ params }) {
  const { id } = params;

  try {
    // Charger toutes les catégories et récupérer la catégorie sélectionnée
    const categories = await getCategories();
    const selectedCategory = categories.find((category) => category.id === id);

    if (!selectedCategory) {
      return <p>Catégorie non trouvée</p>;
    }

    // Charger les produits pour cette catégorie
    const productsData = await fetchProductsByProductListId(selectedCategory.productListId);

    // Passer les données à ShopClient pour le rendu côté client
    return (
      <div>
        <ShopClient category={selectedCategory} allProducts={productsData} />
      </div>
    );
  } catch (error) {
    return <p>Erreur lors de la récupération des données.</p>;
  }
}
