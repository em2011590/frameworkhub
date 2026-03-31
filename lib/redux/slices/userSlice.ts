import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  avatar: string | null;
  level: "junior" | "mid" | "senior";
  savedFrameworks: string[];
  isAuthenticated: boolean;
}

const initialState: UserState = {
  name: null,
  email: null,
  avatar: null,
  level: "junior",
  savedFrameworks: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    clearUser() { return initialState; },
    setLevel(state, action: PayloadAction<"junior" | "mid" | "senior">) { state.level = action.payload; },
    saveFramework(state, action: PayloadAction<string>) {
      if (!state.savedFrameworks.includes(action.payload)) {
        state.savedFrameworks.push(action.payload);
      }
    },
    unsaveFramework(state, action: PayloadAction<string>) {
      state.savedFrameworks = state.savedFrameworks.filter((s) => s !== action.payload);
    },
  },
});

export const { setUser, clearUser, setLevel, saveFramework, unsaveFramework } = userSlice.actions;
export default userSlice.reducer;
