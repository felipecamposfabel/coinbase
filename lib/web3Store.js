import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useWeb3Store = create(
  persist(
    (set, get) => ({
      getItem: (key, defaultState) => get()?.[key] ?? defaultState,
      setItem: (key, value) => set({[key]: value}),
      removeItem: key => set(state => _.omit(state, key), true),
    }),
    {
      name: 'web3',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const coinbaseStorage = {
  getString: useWeb3Store.getState().getItem,
  set: useWeb3Store.getState().setItem,
  delete: useWeb3Store.getState().removeItem,
};
