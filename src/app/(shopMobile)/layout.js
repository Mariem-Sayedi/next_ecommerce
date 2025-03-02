import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import Footer from "@/components/SSR/Footer";
import { getCategories } from "@/services/categoriesService";

import Navbar from "@/components/SSR/NavBar";
import ServerHeader from "@/components/SSR/Header/ServerHeader";
import ClientOnlyProvider from "@/components/CSR/ClientProvider";
import ClientHeader from "@/components/SSR/Header/ClientHeader";
import Search from "@/components/CSR/SearchBar";

export default async function Layout({ children }) {
  const categories = await getCategories();
  

  return (
    <html lang="fr">
      <body>
      <ClientOnlyProvider>
          <ServerHeader >
          <ClientHeader />
          </ ServerHeader>
          <Search />
          <Navbar categories={categories} />       
             <main>{children}</main>
          <Footer categories={categories} />
      </ClientOnlyProvider>
      </body>
    </html>
  );
}
