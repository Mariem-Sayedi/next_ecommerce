import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import Footer from "@/components/Footer";
import { getCategories } from "@/services/categoriesService";

import Navbar from "@/components/Navbar";
import ServerHeader from "@/components/Header/ServerHeader";
import ClientOnlyProvider from "@/components/ClientProvider";
import ClientHeader from "@/components/Header/ClientHeader";

export default async function Layout({ children }) {
  const categories = await getCategories();
  

  return (
    <html lang="fr">
      <body>
      <ClientOnlyProvider>
          <ServerHeader >
          <ClientHeader />
          </ ServerHeader>
          <Navbar categories={categories} />       
             <main>{children}</main>
          <Footer categories={categories} />
      </ClientOnlyProvider>

      </body>
    </html>
  );
}
