"use client"

import Link from "next/link";
import { useSelector } from "react-redux";


const ClientHeader = (props) => {


//   const { total, count } = useSelector((state) => state.cart); // Récupère les infos du panier depuis Redux

  return (
          <>
          <div className="col-sm-3 d-flex justify-content-end">
            <div className="shopping-item">
              <Link href="/cart">
                {/* Cart: <span className="cart-amunt">{total.toFixed(2)} €</span>{" "} */}
                <i className="fa fa-shopping-cart"></i>{" "}
                {/* <span className="product-count">{count}</span> */}
              </Link>
            </div>
          </div> 
          </>
  );
};

export default ClientHeader;
