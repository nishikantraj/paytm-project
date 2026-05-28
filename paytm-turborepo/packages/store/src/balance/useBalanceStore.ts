import { create } from "zustand";

type BalanceStore = {
  balance: number;

  increase: () => void;
  decrease: () => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 0,

  increase: () =>
    set((state) => ({
      balance: state.balance + 1,
    })),

  decrease: () =>
    set((state) => ({
      balance: state.balance - 1,
    })),
}));