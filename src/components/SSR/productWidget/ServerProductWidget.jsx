import ProductWidgetClient from "./ClientProductWidget";

async function fetchProducts(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ServerProductWidget({ title, apiUrl }) {
  const products = await fetchProducts(apiUrl);

  return <ProductWidgetClient title={title} products={products} />;
}
