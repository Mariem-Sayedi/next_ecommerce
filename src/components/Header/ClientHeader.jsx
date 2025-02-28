"use client";

import { usePathname } from "next/navigation"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import Search from "../SearchBar"; 
import { getCategories } from "@/services/categoriesService";
import Navbar from "../NavBar";


const ClientHeader = ({ }) => {
  const { total, count } = useSelector((state) => state.cart);
  const formattedTotal = total ? total.toFixed(2) : "0.00"; 
  const pathname = usePathname(); 
  const categories = getCategories();
  

  return (
    <>
    <div className="col-sm-3 d-flex justify-content-end">
      {/* Affichage de la barre de recherche sauf sur /Checkout et /cart */}
      {pathname !== "/Checkout" && pathname !== "/cart" && (
        <div className="search-container">
          
          <Search /> 
        </div>
      )}
      
      <div className="shopping-item">
        <Link href="/cart">
          Cart: <span className="cart-amunt">{formattedTotal} $</span>{" "}
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="product-count">{count}</span>
        </Link>
      </div>
    </div>
    </>
  );
};

export default ClientHeader;
