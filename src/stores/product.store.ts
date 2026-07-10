import { create } from "zustand";
import type { Product } from "../types";

export const useProductStore = create((set) => ({
  // UI State
  selectedProduct: null,
  searchTerm: "",
  filters: {
    category: "",
    brand: "",
  },

  // Actions
  setSelectedProduct: (product:Product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilters: (newFilters) => 
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    
  resetFilters: () => set({ filters: { category: "", brand: "" }, searchTerm: "" })
}));