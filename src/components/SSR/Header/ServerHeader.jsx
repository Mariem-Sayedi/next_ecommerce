import Logo from "../Logo";
import ClientHeader from "./ClientHeader";

const ServerHeader = ({ }) => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          <Logo />
          <ClientHeader />
        </div>
      </div>
    </header>
  );
};

export default ServerHeader;
