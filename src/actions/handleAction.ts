import { ActionObj } from '../types';
import { useCartStore } from '../store/useCartStore';


const ACTIONS: Record<string, (payload: any) => void> = {
  ADD_TO_CART: (payload) => {
    useCartStore.getState().addItem(payload.id);
  },

  DEEP_LINK: (payload) => {
    console.log('Navigate to:', payload.url);
  },
};

// action handler function 
export const handleAction = (action: ActionObj): void => {
  const handler = ACTIONS[action.type];

  if (!handler) {
    console.warn('Unknown action type:', action.type);
    return;
  }

  handler(action.payload);
};