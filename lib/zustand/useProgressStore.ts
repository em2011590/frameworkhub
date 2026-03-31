import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressStore {
  completedSteps: Record<string, Set<number>>;
  completeStep: (frameworkSlug: string, stepIndex: number) => void;
  uncompleteStep: (frameworkSlug: string, stepIndex: number) => void;
  getProgress: (frameworkSlug: string, totalSteps: number) => number;
  resetProgress: (frameworkSlug: string) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedSteps: {},
      completeStep: (slug, idx) =>
        set((s) => {
          const steps = new Set(s.completedSteps[slug] ?? []);
          steps.add(idx);
          return { completedSteps: { ...s.completedSteps, [slug]: steps } };
        }),
      uncompleteStep: (slug, idx) =>
        set((s) => {
          const steps = new Set(s.completedSteps[slug] ?? []);
          steps.delete(idx);
          return { completedSteps: { ...s.completedSteps, [slug]: steps } };
        }),
      getProgress: (slug, total) => {
        const steps = get().completedSteps[slug];
        if (!steps || total === 0) return 0;
        return Math.round((steps.size / total) * 100);
      },
      resetProgress: (slug) =>
        set((s) => {
          const newSteps = { ...s.completedSteps };
          delete newSteps[slug];
          return { completedSteps: newSteps };
        }),
    }),
    {
      name: "framework-progress",
      // Zustand persist with Set needs serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          const completedSteps: Record<string, Set<number>> = {};
          for (const key in parsed.state.completedSteps) {
            completedSteps[key] = new Set(parsed.state.completedSteps[key]);
          }
          return { ...parsed, state: { ...parsed.state, completedSteps } };
        },
        setItem: (name, value) => {
          const toStore = { ...value, state: { ...value.state, completedSteps: {} as Record<string, number[]> } };
          for (const key in value.state.completedSteps) {
            toStore.state.completedSteps[key] = Array.from(value.state.completedSteps[key] as Set<number>);
          }
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
