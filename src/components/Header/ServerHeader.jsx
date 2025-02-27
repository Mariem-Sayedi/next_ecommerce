
import { useSelector } from "react-redux";
import Logo from "../Logo";
import ClientHeader from "./ClientHeader";
// import Search from "./Search"; 

const ServerHeader = (props) => {
 

  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          
        <Logo />

          {/* Searchbar (affiché sauf sur Checkout)
          <div className="col-sm-6 d-flex justify-content-center">
            {location.pathname !== "/Checkout" && location.pathname !== "/cart" && <Search />}
          </div> */}
          <ClientHeader/>
        </div>
      </div>
    </header>
  );
};

export default ServerHeader;
