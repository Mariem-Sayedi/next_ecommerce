import React from "react";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import '../assets/css/font-awesome.min.css'


const Promo = () => {
    return (
        <div className="promo-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="single-promo promo1">
              <i className="fa fa-refresh"></i>
              <p>30 Days return</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-promo promo2">
              <i className="fa fa-truck"></i>
              <p>Free shipping</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-promo promo3">
              <i className="fa fa-lock"></i>
              <p>Secure payments</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-promo promo4">
              <i className="fa fa-gift"></i>
              <p>New products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};
 
export default Promo;