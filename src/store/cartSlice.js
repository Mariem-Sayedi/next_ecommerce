import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour ajouter un produit au panier
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (product, { getState }) => {
    const { cart } = getState();
    let response;

    if (cart.id) {
      // PANIER EXISTANT : Met à jour avec PUT
      const updatedItems = [...cart.items];
      const existingItemIndex = updatedItems.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].qty += product.qty;
      } else {
        updatedItems.push(product);
      }

      // Recalcul des totaux
      const newSubTotal = updatedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      const newTax = newSubTotal * 0.2;
      const newTotal = newSubTotal + newTax;

      response = await fetch(`http://localhost:3000/carts/${cart.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cart.id,
          items: updatedItems,
          total: newTotal,
          subTotal: newSubTotal,
          tax: newTax,
        }),
      });
    } else {
      // NOUVEAU PANIER : Création via POST
      response = await fetch('http://localhost:3000/carts', {
        method: 'POST',
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
    return updatedCart;
  }
);

const initialState = {
  id: null,
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
    clearCart: (state) => {
      state.id = null;
      state.items = [];
      state.total = 0;
      state.subTotal = 0;
      state.tax = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.subTotal = action.payload.subTotal;
      state.tax = action.payload.tax;
    });
  }
});

export const { removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
