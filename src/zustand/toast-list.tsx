import { TToast } from "@/components/toast";
import { create } from "zustand";

interface TToastListStore {
  list: TToast[];
  add: (toast: TToast) => void;
  remove: (i: number) => void;
}

export const toastListStore = create<TToastListStore>((set, get) => ({
  list: [],
  add: (toast) => {
    set((state) => {
      const updatedList = [...state.list, toast];

      setTimeout(() => {
        get().remove(0);
      }, 1000 * 5);

      return { list: updatedList };
    });
  },
  remove: (toastIdx) =>
    set((state) => ({
      list: state.list.filter((_, i) => i !== toastIdx),
    })),
}));
