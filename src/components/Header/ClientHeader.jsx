"use client"; // Assurer que ce composant est un composant client

import { usePathname } from "next/navigation"; // Importation de usePathname
import Link from "next/link";
import { useSelector } from "react-redux";
import Search from "../SearchBar"; // Importation du composant Search

const ClientHeader = () => {
  const { total, count } = useSelector((state) => state.cart);
  const formattedTotal = total ? total.toFixed(2) : "0.00"; // Valeur par défaut si total est null ou undefined
  const pathname = usePathname(); // Utilisation de usePathname dans next/navigation

  return (
    <div className="col-sm-3 d-flex justify-content-end">
      {/* Affichage de la barre de recherche sauf sur /Checkout et /cart */}
      {pathname !== "/Checkout" && pathname !== "/cart" && (
        <div className="search-container">
          <Search /> {/* La barre de recherche est ici */}
        </div>
      )}
      
      <div className="shopping-item">
        <Link href="/cart">
          Cart: <span className="cart-amunt">{formattedTotal} €</span>{" "}
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="product-count">{count}</span>
        </Link>
      </div>
    </div>
  );
};

export default ClientHeader;
