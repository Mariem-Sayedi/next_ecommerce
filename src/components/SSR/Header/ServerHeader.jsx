import Logo from "../Logo";

const ServerHeader = ({ children }) => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          <Logo />
          {children} 
        </div>
      </div>
    </header>
  );
};

export default ServerHeader;
