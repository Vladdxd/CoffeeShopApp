import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IProduct} from '../../interface/data';

const initialState: IProduct[] = [];

const beansSlice = createSlice({
  name: 'beans',
  initialState,
  reducers: {
    setBeans: (state, action: PayloadAction<IProduct[]>) => {
      return action.payload;
    },
  },
});
export const {setBeans} = beansSlice.actions;

export default beansSlice.reducer;
