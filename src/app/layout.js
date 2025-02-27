
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Footer from "@/components/Footer";
import { getCategories } from "@/services/categoriesService";
import { Provider } from "react-redux";
import store from "@/store/store";
import Navbar from "@/components/Navbar";
import ServerHeader from "@/components/Header/ServerHeader";

export default async function Layout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="fr">
      <body>
          <ServerHeader />
          <Navbar categories={categories} />       
             <main>{children}</main>
          <Footer categories={categories} />
      </body>
    </html>
  );
}
