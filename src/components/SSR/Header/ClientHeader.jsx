"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import { getCategories } from "@/services/categoriesService";
import Search from "@/components/CSR/SearchBar";

const ClientHeader = () => {
  const pathname = usePathname(); // Récupère le chemin actuel
  const categories = getCategories();

  const [cart, setCart] = useState({ total: "0.00", count: 0 });
  const reduxCart = useSelector((state) => state.cart);

  useEffect(() => {
    setCart({
      total: reduxCart.total ? reduxCart.total.toFixed(2) : "0.00",
      count: reduxCart.items ? reduxCart.items.reduce((acc, item) => acc + item.qty, 0) : 0,
    });
  }, [reduxCart]);

  // Vérifier si on est sur /cart ou /checkout
  if (pathname === "/cart" || pathname === "/checkout") {
    return (
      <div className="col-sm-3 d-flex justify-content-end">
        <div className="shopping-item">
          <Link href="/cart">
            Cart: <span className="cart-amunt">{cart.total} $</span>{" "}
            <i className="fa fa-shopping-cart"></i>{" "}
            <span className="product-count ">{cart.count}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Search />
      <div className="col-sm-3 d-flex justify-content-end">
        <div className="shopping-item">
          <Link href="/cart">
            Cart: <span className="cart-amunt">{cart.total} $</span>{" "}
            <i className="fa fa-shopping-cart"></i>{" "}
            <span className="product-count ">{cart.count}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClientHeader;
