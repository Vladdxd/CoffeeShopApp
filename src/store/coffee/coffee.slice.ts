import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../../interface/data';

const initialState: IProduct[] = [];

const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    setCoffee: (state, action: PayloadAction<IProduct[]>) => {
      return action.payload;
    },
  },
});

export const {setCoffee} = coffeeSlice.actions;

export default coffeeSlice.reducer;
