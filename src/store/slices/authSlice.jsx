import { createSlice } from "@reduxjs/toolkit";

const initialState={
  is_authenticated: false,
  user:{
  access_token: "",
  token_type: "",
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  subscription_id: 0,
  role: "",
  company_id: 0,
}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.is_authenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.is_authenticated = false;
      state.user = {};
    },
  },
});

// Export actions properly
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
