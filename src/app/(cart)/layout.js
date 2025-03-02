import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import Footer from "@/components/SSR/Footer";
import { getCategories } from "@/services/categoriesService";
import ServerHeader from "@/components/SSR/Header/ServerHeader";
import ClientOnlyProvider from "@/components/CSR/ClientProvider";
import ClientHeader from "@/components/SSR/Header/ClientHeader";

export default async function Layout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="fr">
      <body>
      <ClientOnlyProvider>
      <ServerHeader >
          <ClientHeader />
          </ ServerHeader>
             <main>{children}</main>
             <Footer categories={categories} />
      </ClientOnlyProvider>
      </body>
    </html>
  );
}
