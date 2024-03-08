import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IProduct} from '../../interface/data';

export interface IProductWithSize extends IProduct {
  size?: string;
}
export interface ProductWithQuantity {
  id: string;
  prices: {
    size: string;
    price: string;
    currency: string;
    quantity: number;
  }[];
}

export interface CartState {
  cartList: ProductWithQuantity[];
  fullPrice: number;
}

export const initialState: CartState = {
  cartList: [],
  fullPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setQuantity: (
      state,
      action: PayloadAction<{id: string; size: string; quantity: number}>,
    ) => {
      const currentProduct = state.cartList.find(
        item => item.id === action.payload.id,
      );
      if (currentProduct) {
        const currentPrice = currentProduct.prices.find(
          price => price.size === action.payload.size,
        );
        if (currentPrice) {
          currentPrice.quantity = action.payload.quantity;
        }
      }
    },
    setCartState: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const currentProduct = state.cartList.findIndex(
        item => item.id === action.payload,
      );
      currentProduct !== -1 && state.cartList.splice(currentProduct, 1);
    },
    addToCart: (state, action: PayloadAction<IProductWithSize>) => {
      const isExist = state.cartList.some(
        item => item.id === action.payload.id,
      );
      if (!isExist) {
        const prices = action.payload.prices.map(price => {
          let quantity = 0;
          action.payload.size &&
            price.size === action.payload.size &&
            quantity++;

          return {
            price: price.price,
            size: price.size,
            currency: price.currency,
            quantity,
          };
        });

        state.cartList.push({
          id: action.payload.id,
          prices,
        });
      } else {
        const currentProduct = state.cartList.find(
          item => item.id === action.payload.id,
        );
        currentProduct &&
          action.payload.size &&
          currentProduct.prices.forEach(price => {
            if (price.size === action.payload.size) price.quantity++;
          });
      }
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{id: string; size: string; quantity: number}>,
    ) => {
      const currentProduct = state.cartList.find(
        item => item.id === action.payload.id,
      );
      currentProduct &&
        action.payload &&
        currentProduct.prices.forEach(price => {
          if (price.size === action.payload.size)
            price.quantity += action.payload.quantity;
        });
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{id: string; size: string; quantity: number}>,
    ) => {
      const currentProduct = state.cartList.find(
        item => item.id === action.payload.id,
      );
      if (currentProduct) {
        const currentPrice = currentProduct.prices.find(
          price => price.size === action.payload.size,
        );
        if (currentPrice) {
          if (currentPrice.quantity <= action.payload.quantity) {
            currentPrice.quantity = 0;
          } else {
            currentPrice.quantity -= action.payload.quantity;
          }
        }
      }
    },
    calculateFullPrice: state => {
      if (state.cartList.length > 0) {
        let fullPrice = 0;
        state.cartList.forEach(item => {
          item.prices.forEach(price => {
            fullPrice += Number(price.price) * price.quantity;
          });
        });
        state.fullPrice = Number(fullPrice.toFixed(2));
      }
    },
  },
});
export const {
  addToCart,
  setCartState,
  incrementQuantity,
  decrementQuantity,
  calculateFullPrice,
  removeFromCart,
  setQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
