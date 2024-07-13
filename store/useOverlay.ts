import { create } from 'zustand';

interface Overlay {
  orderConfirmationIsOpen: boolean;
  openOrderConfirmation: () => void;
  closeOrderConfirmation: () => void;
}

export const useOverlay = create<Overlay>((set) => ({
  orderConfirmationIsOpen: false,
  openOrderConfirmation: () => set({ orderConfirmationIsOpen: true }),
  closeOrderConfirmation: () => set({ orderConfirmationIsOpen: false }),
}));
