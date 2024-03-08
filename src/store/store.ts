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

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import coffeeReducer from './coffee/coffee.slice';
import beansReducer from './beans/beans.slice';
import cartReducer from './cart/cart.slice';
import favoritesReducer from './favorites/favorites.slice';
import orderHistoryReducer from './history/orderHistory.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
  coffeeReducer,
  beansReducer,
  cartReducer,
  favoritesReducer,
  orderHistoryReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cartReducer', 'favoritesReducer', 'orderHistoryReducer'],
  blacklist: ['coffeeReducer', 'beansReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// IMPORTANT
// export const store = configureStore({
//   reducer: {
//     coffeeReducer,
//     beansReducer,
//     cartReducer,
//     favoritesReducer,
//     orderHistoryReducer,
//   },
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
