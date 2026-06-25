// use zustand to store the cart state
import { create } from 'zustand';

interface CartStore {
  count: number;
  items: Record<string, number>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
}

// create the store
export const useCartStore = create<CartStore>((set, get) => ({
  count: 0,
  items: {},

  addItem: (id: string) => {
    set((state) => ({
      count: state.count + 1,
      items: {
        ...state.items,
        [id]: (state.items[id] ?? 0) + 1,
      },
    }));
  },

  removeItem: (id: string) => {
    const current = get().items[id] ?? 0;
    if (current === 0) return;
    set((state) => ({
      count: state.count - 1,
      items: {
        ...state.items,
        [id]: current - 1,
      },
    }));
  },
}));