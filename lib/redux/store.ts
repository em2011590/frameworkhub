import { configureStore } from "@reduxjs/toolkit";
import frameworksReducer from "./slices/frameworksSlice";
import compareReducer from "./slices/compareSlice";
import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    frameworks: frameworksReducer,
    compare: compareReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
