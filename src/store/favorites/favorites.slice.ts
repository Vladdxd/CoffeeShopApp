import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../../interface/data';

const initialState: string[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IProduct>) => {
      const currentIndex = state.findIndex(item => item === action.payload.id);

      if (currentIndex === -1) return [...state, action.payload.id];
      state.splice(currentIndex, 1);
    },
  },
});

export const {addToFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;
