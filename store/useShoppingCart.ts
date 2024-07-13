import { IItem } from '@/types/types';
import { create } from 'zustand';

interface ShoppingCart {
  items: Map<string, [IItem, number]>;
  numOfItems: number;
  addItem: (item: IItem) => void;
  removeItem: (item: IItem) => void;
  resetItems: () => void;
  totalAmount: number;
  getItemAmount: (item: IItem) => number;
}

export const useShoppingCart = create<ShoppingCart>((set, get) => ({
  items: new Map(),
  numOfItems: 0,
  totalAmount: 0,
  addItem: (item) =>
    set((state) => {
      const currentAmount = state.items.get(item.id)?.[1] || 0;
      const newAmount = currentAmount + 1;
      const newItems = new Map(state.items);
      newItems.set(item.id, [item, newAmount]);

      return {
        items: newItems,
        numOfItems: state.numOfItems + 1,
        totalAmount: state.totalAmount + item.price,
      };
    }),
  removeItem: (item) =>
    set((state) => {
      const currentAmount = state.items.get(item.id)?.[1] || 0;

      if (currentAmount === 0) return state;

      const newAmount = currentAmount - 1;
      const newItems = new Map(state.items);

      if (newAmount === 0) {
        newItems.delete(item.id);
      } else {
        newItems.set(item.id, [item, newAmount]);
      }

      return {
        items: newItems,
        numOfItems: Math.max(state.numOfItems - 1, 0),
        totalAmount: Math.max(state.totalAmount - item.price, 0),
      };
    }),
  resetItems: () =>
    set((state) => ({
      items: new Map(),
      numOfItems: 0,
      totalAmount: 0,
    })),
  getItemAmount: (item) => {
    return get().items.get(item.id)?.[1] || 0;
  },
}));
