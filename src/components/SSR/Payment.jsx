const Payment = () => {
    return (
      <div id="payment">
        <ul className="payment_methods methods">
          {/* Méthode de paiement : Virement bancaire direct */}
          <li className="payment_method_bacs">
            <input
              className="input-radio"
              id="payment_method_bacs"
              name="payment_method"
              type="radio"
              defaultChecked
              defaultValue="bacs"
              data-order_button_text=""
            />
            <label htmlFor="payment_method_bacs">Direct Bank Transfer</label>
            <div className="payment_box payment_method_bacs">
              <p>
                Make your payment directly into our bank account. Please use your Order ID 
                as the payment reference. Your order won’t be shipped until the funds have 
                cleared in our account.
              </p>
            </div>
          </li>
  
          {/* Méthode de paiement : Chèque */}
          <li className="payment_method_cheque">
            <input
              className="input-radio"
              id="payment_method_cheque"
              name="payment_method"
              type="radio"
              defaultValue="cheque"
              data-order_button_text=""
            />
            <label htmlFor="payment_method_cheque">Cheque Payment</label>
            <div className="payment_box payment_method_cheque" style={{ display: "none" }}>
              <p>
                Please send your cheque to Store Name, Store Street, Store Town, Store State / County, 
                Store Postcode.
              </p>
            </div>
          </li>
  
          {/* Méthode de paiement : PayPal */}
          <li className="payment_method_paypal">
            <input
              className="input-radio"
              id="payment_method_paypal"
              name="payment_method"
              type="radio"
              defaultValue="paypal"
              data-order_button_text="Proceed to PayPal"
            />
            <label htmlFor="payment_method_paypal">
              PayPal{" "}
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"
                alt="PayPal Acceptance Mark"
              />
              <a
                className="about_paypal"
                href="https://www.paypal.com/gb/webapps/mpp/paypal-popup"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://www.paypal.com/gb/webapps/mpp/paypal-popup",
                    "WIPaypal",
                    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700"
                  );
                }}
                title="What is PayPal?"
              >
                What is PayPal?
              </a>
            </label>
            <div className="payment_box payment_method_paypal" style={{ display: "none" }}>
              <p>
                Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
              </p>
            </div>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Payment;
  