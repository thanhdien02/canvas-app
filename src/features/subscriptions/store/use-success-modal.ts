import { create } from "zustand";

type SuccessModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useSuccessModalState = create<SuccessModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
