import { createSlice } from "@reduxjs/toolkit";

const initialState={
 plans:[]
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    fetchPlans: (state, action) => {
      state.is_authenticated = true;
      state.plans = action.payload;
    },
  },
});

// Export actions properly
export const { fetchPlans } = plansSlice.actions;
export default plansSlice.reducer;