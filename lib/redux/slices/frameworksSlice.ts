import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = "all" | "frontend" | "backend" | "fullstack" | "mobile" | "css" | "testing" | "devops";
export type Level = "all" | "junior" | "mid" | "senior";

export interface FrameworkSummary {
  id: string;
  name: string;
  slug: string;
  category: string;
  logo: string;
  color: string;
  description: string;
  level: string[];
  tags: string[];
  language: string;
  stars: number;
  weeklyDownloads: number;
  performance: number;
  learningCurve: number;
  ecosystem: number;
  jobMarket: number;
}

interface FrameworksState {
  items: FrameworkSummary[];
  filteredItems: FrameworkSummary[];
  loading: boolean;
  error: string | null;
  selectedCategory: Category;
  selectedLevel: Level;
  selectedLanguage: string;
  searchQuery: string;
  savedIds: string[];
}

const initialState: FrameworksState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  selectedCategory: "all",
  selectedLevel: "all",
  selectedLanguage: "all",
  searchQuery: "",
  savedIds: [],
};

function applyFilters(
  items: FrameworkSummary[],
  category: Category,
  level: Level,
  language: string,
  query: string
) {
  return items.filter((f) => {
    if (category !== "all" && f.category !== category) return false;
    if (level !== "all" && !f.level.includes(level)) return false;
    if (language !== "all" && f.language !== language) return false;
    if (query && !f.name.toLowerCase().includes(query.toLowerCase()) &&
        !f.description.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
}

const frameworksSlice = createSlice({
  name: "frameworks",
  initialState,
  reducers: {
    setFrameworks(state, action: PayloadAction<FrameworkSummary[]>) {
      state.items = action.payload;
      state.filteredItems = applyFilters(
        action.payload, state.selectedCategory, state.selectedLevel, state.selectedLanguage, state.searchQuery
      );
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload; },
    setError(state, action: PayloadAction<string | null>) { state.error = action.payload; state.loading = false; },
    setCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload;
      state.filteredItems = applyFilters(state.items, action.payload, state.selectedLevel, state.selectedLanguage, state.searchQuery);
    },
    setLevel(state, action: PayloadAction<Level>) {
      state.selectedLevel = action.payload;
      state.filteredItems = applyFilters(state.items, state.selectedCategory, action.payload, state.selectedLanguage, state.searchQuery);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.selectedLanguage = action.payload;
      state.filteredItems = applyFilters(state.items, state.selectedCategory, state.selectedLevel, action.payload, state.searchQuery);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredItems = applyFilters(state.items, state.selectedCategory, state.selectedLevel, state.selectedLanguage, action.payload);
    },
    toggleSave(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.savedIds.includes(id)) {
        state.savedIds = state.savedIds.filter((s) => s !== id);
      } else {
        state.savedIds.push(id);
      }
    },
    setDeepSearchResults(state, action: PayloadAction<FrameworkSummary[]>) {
      state.filteredItems = action.payload;
    }
  },
});

export const { 
  setFrameworks, setLoading, setError, setCategory, setLevel, 
  setLanguage, setSearchQuery, toggleSave, setDeepSearchResults 
} = frameworksSlice.actions;
export default frameworksSlice.reducer;
