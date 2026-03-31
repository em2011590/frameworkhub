import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  searchModalOpen: boolean;
  suggestionBoxOpen: boolean;
  activeTooltip: string | null;
  setSidebarOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  toggleSuggestionBox: () => void;
  setActiveTooltip: (id: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  searchModalOpen: false,
  suggestionBoxOpen: false,
  activeTooltip: null,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  toggleSuggestionBox: () => set((s) => ({ suggestionBoxOpen: !s.suggestionBoxOpen })),
  setActiveTooltip: (id) => set({ activeTooltip: id }),
}));
