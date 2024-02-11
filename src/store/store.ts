// import {create} from 'zustand';
// import {produce} from 'immer';
// import {persist, createJSONStorage} from 'zustand/middleware';
// import AsyncStorage, {
//   useAsyncStorage,
// } from '@react-native-async-storage/async-storage';
// import CoffeeData from '../data/CoffeeData';
// import BeansData from '../data/BeansData';

// export const useStore = create(
//   persist(
//     (set, get) => ({
//       CoffeeList: CoffeeData,
//       BeanList: BeansData,
//       FavoritesList: [],
//       CartList: [],
//       OrderHistory: [],
//       cartPrice: 0,
//     }),
//     {
//       name: 'Coffee_Shop_App',
//       storage: createJSONStorage(() => AsyncStorage),
//     },
//   ),
// );

import {configureStore} from '@reduxjs/toolkit';
import coffeeReducer from './coffee/coffee.slice';
import beansReducer from './beans/beans.slice';
import cartReducer from './cart/cart.slice';
import favoritesReducer from './favorites/favorites.slice';

export const store = configureStore({
  reducer: {coffeeReducer, beansReducer, cartReducer, favoritesReducer},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
