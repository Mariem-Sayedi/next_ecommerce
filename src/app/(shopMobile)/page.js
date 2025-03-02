import ImageCarousel from "@/components/CSR/ImageCarousel";
import Promo from "@/components/SSR/Promo";
import Marque from "@/components/SSR/Marque";
import ProductsArea from "@/components/SSR/ProductsArea";


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
