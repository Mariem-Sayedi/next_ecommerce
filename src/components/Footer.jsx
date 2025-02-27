import Link from "next/link";
import Newsletter from "./Newsletter";
import MyStore from "./MyStore";

export default function Footer(props) {
    
    const categories = props.categories;

    if(!categories){
        return null;
    }

  return (
    <div className="footer-top-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
        <MyStore />
          <div className="col-md-4 col-sm-6">
            <div className="footer-menu">
              <h2 className="footer-wid-title">Catégories</h2>
              <ul>
                {categories?.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/category/${category.id}`}>{category.name}</Link>
                    </li>
                  ))
                ) : (
                  <p>Aucune catégorie disponible.</p>
                )}
              </ul>
            </div>
          </div>
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
