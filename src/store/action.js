import { setCart } from './cartSlice';

export const addToCart = (product, quantity = 1) => async (dispatch, getState) => {
  const state = getState();
  const cartId = state.cart.cartId;

  // Création du nouvel article
  const updatedItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    qty: quantity,
    imageName: product.imageName,
  };

  if (!cartId) {
    // Si pas de cartId, on crée un nouveau panier (requête POST)
    const response = await fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total: updatedItem.price * updatedItem.qty,
        subTotal: updatedItem.price * updatedItem.qty,
        tax: (updatedItem.price * updatedItem.qty) * 0.12,
        items: [updatedItem],
      }),
    });
    const newCart = await response.json();
    dispatch(setCart(newCart)); // Sauvegarder le panier dans Redux
  } else {
    // Si cartId existe déjà, on met à jour le panier (requête PUT)
    const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state.cart,
        items: [...state.cart.items, updatedItem],
        total: state.cart.total + updatedItem.price * updatedItem.qty,
        subTotal: state.cart.subTotal + updatedItem.price * updatedItem.qty,
        tax: (state.cart.subTotal + updatedItem.price * updatedItem.qty) * 0.12,
      }),
    });
    const updatedCart = await response.json();
    dispatch(setCart(updatedCart)); 
  }
};



