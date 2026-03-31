import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameworkSummary } from "./frameworksSlice";

interface SearchState {
  query: string;
  results: FrameworkSummary[];
  suggestions: string[];
  isLoading: boolean;
  isOpen: boolean;
}

const initialState: SearchState = {
  query: "",
  results: [],
  suggestions: [],
  isLoading: false,
  isOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) { state.query = action.payload; },
    setResults(state, action: PayloadAction<FrameworkSummary[]>) { state.results = action.payload; state.isLoading = false; },
    setSuggestions(state, action: PayloadAction<string[]>) { state.suggestions = action.payload; },
    setSearchLoading(state, action: PayloadAction<boolean>) { state.isLoading = action.payload; },
    openSearch(state) { state.isOpen = true; },
    closeSearch(state) { state.isOpen = false; state.query = ""; state.results = []; },
  },
});

export const { setQuery, setResults, setSuggestions, setSearchLoading, openSearch, closeSearch } = searchSlice.actions;
export default searchSlice.reducer;
