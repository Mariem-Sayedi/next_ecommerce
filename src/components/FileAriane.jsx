"use client"; 

import Link from "next/link";
import { useParams } from "next/navigation";

function FileAriane({ categoryName, product }) {
  const { id } = useParams();

  return (
    <div className="product-breadcrumb">
      <Link href="/">Home</Link>
      <span> / </span>
      <Link href={`/category/${id}`}>{categoryName}</Link>
    </div>
  );
}

export default FileAriane;
