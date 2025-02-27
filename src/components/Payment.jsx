import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';


const Payment = () => { 
    
    
return (   
    <div id="payment">
                                        <ul className="payment_methods methods">
                                            <li className="payment_method_bacs">
                                                <input
                                                    className="input-radio"
                                                    data-order_button_text=""
                                                    defaultChecked
                                                    defaultValue="bacs"
                                                    id="payment_method_bacs"
                                                    name="payment_method"
                                                    type="radio" />
                                                <label htmlFor="payment_method_bacs">
                                                    Direct Bank Transfer{" "}
                                                </label>
                                                <div className="payment_box payment_method_bacs">
                                                    <p>
                                                        Make your payment directly into our bank account.
                                                        Please use your Order ID as the payment reference.
                                                        Your order won’t be shipped until the funds have
                                                        cleared in our account.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="payment_method_cheque">
                                                <input
                                                    className="input-radio"
                                                    data-order_button_text=""
                                                    defaultValue="cheque"
                                                    id="payment_method_cheque"
                                                    name="payment_method"
                                                    type="radio" />
                                                <label htmlFor="payment_method_cheque">
                                                    Cheque Payment{" "}
                                                </label>
                                                <div
                                                    className="payment_box payment_method_cheque"
                                                    style={{
                                                        display: "none",
                                                    }}>
                                                    <p>
                                                        Please send your cheque to Store Name, Store Street,
                                                        Store Town, Store State / County, Store Postcode.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="payment_method_paypal">
                                                <input
                                                    className="input-radio"
                                                    data-order_button_text="Proceed to PayPal"
                                                    defaultValue="paypal"
                                                    id="payment_method_paypal"
                                                    name="payment_method"
                                                    type="radio" />
                                                <label htmlFor="payment_method_paypal">
                                                    PayPal{" "}
                                                    <img
                                                        alt="PayPal Acceptance Mark"
                                                        src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" />
                                                    <a
                                                        className="about_paypal"
                                                        href="https://www.paypal.com/gb/webapps/mpp/paypal-popup"
                                                        onclick="javascript:window.open('https://www.paypal.com/gb/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"
                                                        title="What is PayPal?">
                                                        What is PayPal?
                                                    </a>
                                                </label>
                                                <div
                                                    className="payment_box payment_method_paypal"
                                                    style={{
                                                        display: "none",
                                                    }}>
                                                    <p>
                                                        Pay via PayPal; you can pay with your credit card if
                                                        you don’t have a PayPal account.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                        
                                    </div>
  
  )
  };
export default Payment;

