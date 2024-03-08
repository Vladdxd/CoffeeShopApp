import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IProduct, IProductWithQuantity} from '../../interface/data';

export interface IOrderHistory {
  totalPrice: number;
  products: IProductWithQuantity[];
  orderDate: string;
}

type addToHistoryProps = {
  totalPrice: number;
  products: IProductWithQuantity[];
};

const initialState: IOrderHistory[] = [];

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<addToHistoryProps>) => {
      const {products, totalPrice} = action.payload;

      state.unshift({
        totalPrice,
        products,
        orderDate:
          new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
      });
    },
  },
});

export const {addToHistory} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;
