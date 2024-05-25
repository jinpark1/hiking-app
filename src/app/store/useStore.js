// src/useStore.js
import create from "zustand";

const useStore = create((set) => ({
  user: null,
  suggestions: [],
  setUser: (userInfo) => set({ user: userInfo }),
  clearUser: () => set({ user: null }),
  setSuggestions: (suggestions) => set({ suggestions }),
  clearSuggestions: () => set({ suggestions: [] }),
}));

export default useStore;
