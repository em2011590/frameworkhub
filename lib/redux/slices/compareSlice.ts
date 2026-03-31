import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameworkSummary } from "./frameworksSlice";

interface CompareState {
  selected: FrameworkSummary[];
  maxItems: number;
}

const initialState: CompareState = { selected: [], maxItems: 4 };

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare(state, action: PayloadAction<FrameworkSummary>) {
      if (state.selected.length >= state.maxItems) return;
      if (!state.selected.find((f) => f.slug === action.payload.slug)) {
        state.selected.push(action.payload);
      }
    },
    removeFromCompare(state, action: PayloadAction<string>) {
      state.selected = state.selected.filter((f) => f.slug !== action.payload);
    },
    clearCompare(state) { state.selected = []; },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
