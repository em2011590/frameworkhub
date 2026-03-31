import { create } from "zustand";

interface PaginationStore {
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  nextPage: () => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  page: 1,
  hasMore: true,
  isLoading: false,
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setIsLoading: (isLoading) => set({ isLoading }),
  nextPage: () => set((s) => ({ page: s.page + 1 })),
  reset: () => set({ page: 1, hasMore: true, isLoading: false }),
}));
