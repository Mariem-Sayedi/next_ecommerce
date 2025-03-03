import { getCategories } from "@/services/categoriesService";
import NavbarClient from "./NavbarClient"; 

export default async function NavbarServer() {
  const { data: categories, error } = await getCategories();

  if (error) {
    console.error("Failed to fetch categories:", error);
    return null; 
  }
  return <NavbarClient categories={categories} />;
}