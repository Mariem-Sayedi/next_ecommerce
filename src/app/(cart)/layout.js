import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import Footer from "@/components/Footer";
import { getCategories } from "@/services/categoriesService";
import ServerHeader from "@/components/Header/ServerHeader";
import ClientOnlyProvider from "@/components/ClientProvider";

export default async function Layout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="fr">
      <body>
      <ClientOnlyProvider>
             <main>{children}</main>
      </ClientOnlyProvider>
      </body>
    </html>
  );
}
