"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const ClientHeader = () => {
  const { total, count } = useSelector((state) => state.cart);

  const formattedTotal = total ? total.toFixed(2) : "0.00"; // Valeur par défaut si total est null ou undefined

  return (
    <div className="col-sm-3 d-flex justify-content-end">
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
