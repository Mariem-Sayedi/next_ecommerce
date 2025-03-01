import styles from "../page.module.css";
import Marque from "@/components/Marque";
import Promo from "@/components/Promo";
import ImageCarousel from "@/components/ImageCarousel";
import ProductsArea from "@/components/ProductsArea";

export default function Home() {
  return (
    <>
    <ImageCarousel />   
    <Promo />
    <Marque />  
    <ProductsArea /> 
    </>
  );
}
