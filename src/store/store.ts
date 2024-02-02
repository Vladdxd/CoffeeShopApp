import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoritesList: [],
      CartList: [],
      OrderHistory: [],
      cartPrice: 0,
    }),
    {
      name: 'Coffee_Shop_App',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
