import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour ajouter un produit au panier
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (product, { getState, dispatch }) => {
    const cart = getState().cart; // Récupérer l'état actuel du panier dans le store
    let response;

    if (cart.items.length > 0) {
      // Si le panier existe déjà, mettez-le à jour
      const updatedItems = [...cart.items];
      const existingItemIndex = updatedItems.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Si le produit existe déjà dans le panier, mettez à jour la quantité
        updatedItems[existingItemIndex].qty += product.qty;
      } else {
        // Sinon, ajoutez le produit au panier
        updatedItems.push(product);
      }

      // Recalculez les totaux du panier
      const newSubTotal = updatedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      const newTax = newSubTotal * 0.2;
      const newTotal = newSubTotal + newTax;

      // Effectuer une mise à jour via PUT (vous enverrez l'objet mis à jour)
      response = await fetch('http://localhost:3000/carts', {
        method: 'PUT', // Utilisation de PUT pour mettre à jour un panier existant
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: updatedItems,
          total: newTotal,
          subTotal: newSubTotal,
          tax: newTax,
        }),
      });
    } else {
      // Si le panier est vide, créez un nouveau panier avec l'article
      response = await fetch('http://localhost:3000/carts', {
        method: 'POST', // Crée un nouveau panier avec l'article
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [product],
          total: product.price * product.qty,
          subTotal: product.price * product.qty,
          tax: (product.price * product.qty) * 0.2,
        }),
      });
    }

    const updatedCart = await response.json();
    return updatedCart; // Retourner le panier mis à jour
  }
);

const initialState = {
  items: [],
  total: 0,
  subTotal: 0,
  tax: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.subTotal = state.items.reduce((acc, item) => acc + item.price * item.qty, 0);
      state.tax = state.subTotal * 0.2;
      state.total = state.subTotal + state.tax;
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].qty = action.payload.qty;
      }
      state.subTotal = state.items.reduce((acc, item) => acc + item.price * item.qty, 0);
      state.tax = state.subTotal * 0.2;
      state.total = state.subTotal + state.tax;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.subTotal = action.payload.subTotal;
        state.tax = action.payload.tax;
      });
  }
});

export const { removeItemFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
