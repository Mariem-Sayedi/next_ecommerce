import ClientProductDetails from "./clientProductDetails";

// Récupération des données sur le serveur
async function getProductById(productId) {
  const res = await fetch(`http://localhost:3000/products`);
  const products = await res.json();
  return products.find((p) => p.id === productId) || null;
}

export default async function ProductPage({ params }) {
  // Attendre la résolution de params
  const { id: categoryId, productId } = await params;

  const product = await getProductById(productId);

  return <ClientProductDetails product={product} categoryId={categoryId} />;
}
