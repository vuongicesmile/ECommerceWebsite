import { createSelector } from '@reduxjs/toolkit';

// khi gặp state mà phụ thuộc vào các state khác thì không lưu trên redux 
// thay vì đó dùng selector

const cartItemsSelector = state => {
    console.log(state);
  return state.cart.cartItems;
} 

// count number of product in card
// 1 thằng phụ thuộc selector cartItemsSelector
export const cartItemsCountSelector = createSelector(cartItemsSelector,
    (cartItems) =>  cartItems.reduce((count, item) => count + item.quantity, 0));
// calculate  total of cart
export const cartTotalSelector = createSelector(cartItemsSelector, (cartItems) => cartItems.reduce((total, item) => total + (item.salePrice * item.quantity), 0))
// state này có thể tính toán được phụ thuộc vào các state nào khác 
// selector để tính toán lại 