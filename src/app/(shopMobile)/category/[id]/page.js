
import { fetchProductsByProductListId } from "@/services/productsService";
import { getCategories } from "@/services/categoriesService";
import ShopClient from "./shopClient";

export const revalidate = 60; 

export async function generateMetadata({ params }) {
  const { id } = await params

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
  const { id } = await params;

  try {
    const categories = await getCategories();
    const selectedCategory = categories.find((category) => category.id === id);

    if (!selectedCategory) {
      return <p>Catégorie non trouvée</p>;
    }

    const productsData = await fetchProductsByProductListId(selectedCategory.productListId);

    // passer les données à shopClient pour le CSR
    return (
      <div>
        <ShopClient category={selectedCategory} allProducts={productsData} />
      </div>
    );
  } catch (error) {
    return <p>Erreur lors de la récupération des données.</p>;
  }
}