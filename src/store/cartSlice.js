// import { createSlice } from "@reduxjs/toolkit";

// // Chargement et sauvegarde du panier dans localStorage
// const loadCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem("cart");
//   return savedCart ? JSON.parse(savedCart) : { cartId: null, items: [], total: 0, count: 0 };
// };

// const saveCartToLocalStorage = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// // Fonction de calcul des totaux
// const calculateCartTotals = (items) => {
//   const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const tax = subTotal * 0.12; 
//   const total = subTotal + tax;
//   const count = items.reduce((sum, item) => sum + item.qty, 0);
//   return { subTotal, tax, total, count };
// };

// const initialState = loadCartFromLocalStorage();

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart: (state, action) => {
//       state.cartId = action.payload.cartId;
//       state.items = action.payload.items;
//       const totals = calculateCartTotals(state.items);
//       state.total = totals.total;
//       state.subTotal = totals.subTotal;
//       state.tax = totals.tax;
//       state.count = totals.count;
//       saveCartToLocalStorage(state);
//     },

//     addItem: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);

//       if (existingItem) {
//         // Si le produit existe déjà, on met à jour la quantité
//         existingItem.qty += action.payload.qty;
//       } else {
//         // Si le produit n'existe pas, on l'ajoute au panier
//         state.items.push(action.payload);
//       }

//       const totals = calculateCartTotals(state.items);
//       state.total = totals.total;
//       state.subTotal = totals.subTotal;
//       state.tax = totals.tax;
//       state.count = totals.count;
//       saveCartToLocalStorage(state);
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//       const totals = calculateCartTotals(state.items);
//       state.total = totals.total;
//       state.subTotal = totals.subTotal;
//       state.tax = totals.tax;
//       state.count = totals.count;
//       saveCartToLocalStorage(state);
//     },

//     updateQuantity: (state, action) => {
//       const { id, qty } = action.payload;
//       const item = state.items.find((item) => item.id === id);
//       if (item) {
//         item.qty = qty;
//         const totals = calculateCartTotals(state.items);
//         state.total = totals.total;
//         state.subTotal = totals.subTotal;
//         state.tax = totals.tax;
//         state.count = totals.count;
//         saveCartToLocalStorage(state);
//       }
//     },
//   },
// });

// export const { setCart, addItem, removeFromCart, updateQuantity } = cartSlice.actions;

// // Actions pour ajouter, mettre à jour la quantité et supprimer un produit du panier
// export const addToCart = (product, quantity = 1) => (dispatch) => {
//   const updatedItem = {
//     id: product.id,
//     name: product.name,
//     price: product.price,
//     qty: quantity,
//     imageName: product.imageName,
//   };

//   dispatch(addItem(updatedItem)); 
// };

// export const updateItemQuantity = (id, qty) => (dispatch) => {
//   dispatch(updateQuantity({ id, qty })); 
// };

// export const removeItemFromCart = (id) => (dispatch) => {
//   dispatch(removeFromCart(id)); 
// };

// // export default cartSlice.reducer;
