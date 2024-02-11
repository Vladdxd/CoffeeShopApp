import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IProduct, IProductWithQuantity} from '../../interface/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const initialState: CartState = {
  cartList: [],
  fullPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartState: (state, action: PayloadAction<CartState>) => {
      return action.payload;
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
        console.log(state.fullPrice);

        AsyncStorage.setItem('cart', JSON.stringify(state))
          .then(() => {
            console.log('set Cart');
          })
          .catch(err => {
            console.error('Ошибка при сохранении cart в AsyncStorage:', err);
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

        AsyncStorage.setItem('cart', JSON.stringify(state))
          .then(() => {
            console.log('set Cart');
          })
          .catch(err => {
            console.error('Ошибка при сохранении cart в AsyncStorage:', err);
          });
      }
      // AsyncStorage.removeItem('cart');
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{id: string; size: string}>,
    ) => {
      const currentProduct = state.cartList.find(
        item => item.id === action.payload.id,
      );
      currentProduct &&
        action.payload &&
        currentProduct.prices.forEach(price => {
          if (price.size === action.payload.size) price.quantity++;
        });

      AsyncStorage.setItem('cart', JSON.stringify(state))
        .then(() => {
          console.log('set Cart');
        })
        .catch(err => {
          console.error('Ошибка при сохранении cart в AsyncStorage:', err);
        });
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{id: string; size: string}>,
    ) => {
      const currentProduct = state.cartList.find(
        item => item.id === action.payload.id,
      );
      currentProduct &&
        action.payload &&
        currentProduct.prices.forEach(price => {
          if (price.size === action.payload.size)
            if (price.quantity > 0) price.quantity--;
        });
      AsyncStorage.setItem('cart', JSON.stringify(state))
        .then(() => {
          console.log('set Cart');
        })
        .catch(err => {
          console.error('Ошибка при сохранении cart в AsyncStorage:', err);
        });
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
} = cartSlice.actions;

export default cartSlice.reducer;
