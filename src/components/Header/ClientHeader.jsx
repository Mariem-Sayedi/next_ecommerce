"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import Search from "../SearchBar"; 
import { getCategories } from "@/services/categoriesService";
import Navbar from "../NavBar";

const ClientHeader = () => {
  const pathname = usePathname(); 
  const categories = getCategories();

  // Éviter l'erreur d'hydratation en initialisant les valeurs côté client
  const [cart, setCart] = useState({ total: "0.00", count: 0 });

  const reduxCart = useSelector((state) => state.cart);

  useEffect(() => {
    setCart({
      total: reduxCart.total ? reduxCart.total.toFixed(2) : "0.00",
      count: reduxCart.count,
    });
  }, [reduxCart]);

  return (
    <div className="col-sm-3 d-flex justify-content-end">
      {pathname !== "/Checkout" && pathname !== "/cart" && (
        <div className="search-container">
          <Search /> 
        </div>
      )}
      
      <div className="shopping-item">
        <Link href="/cart">
          Cart: <span className="cart-amunt">{cart.total} $</span>{" "}
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="product-count">{cart.count}</span>
        </Link>
      </div>
    </div>
  );
};

export default ClientHeader;
