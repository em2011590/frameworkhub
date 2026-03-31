import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameworkSummary } from "./frameworksSlice";

interface DashboardState {
  saved: FrameworkSummary[];
  recentlyViewed: FrameworkSummary[];
  roadmapProgress: Record<string, number>;
}

const initialState: DashboardState = {
  saved: [],
  recentlyViewed: [],
  roadmapProgress: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSaved(state, action: PayloadAction<FrameworkSummary[]>) { state.saved = action.payload; },
    addRecentlyViewed(state, action: PayloadAction<FrameworkSummary>) {
      state.recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter((f) => f.slug !== action.payload.slug),
      ].slice(0, 10);
    },
    setRoadmapProgress(state, action: PayloadAction<{ id: string; progress: number }>) {
      state.roadmapProgress[action.payload.id] = action.payload.progress;
    },
  },
});

export const { setSaved, addRecentlyViewed, setRoadmapProgress } = dashboardSlice.actions;
export default dashboardSlice.reducer;
