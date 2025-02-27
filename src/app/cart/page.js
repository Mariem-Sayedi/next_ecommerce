import CartClient from "./clientCart";

const fetchCartData = async () => {
  return {
    taxRate: 0.2, 
    discount: 5,  
  };
};

const CartPage = async () => {
  const cartData = await fetchCartData(); 

  return <CartClient taxRate={cartData.taxRate} discount={cartData.discount} />;
};

export default CartPage;
