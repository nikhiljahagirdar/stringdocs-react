import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    userId:"",
    companyId:"",
    name: "",
    size: "",
    location: "",
    logo: "",
    industry: "",
    phone: "",
    companyEmail: "",
    website: "",
    description:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedPlan: "",
    billingCycle:"",
    paymentMethod: "stripe",
    termsAgreed: false,
    paypalEmail: "",
    stripeEmail: "",
    prodId:"",
  }
};

const regRecStepSlice = createSlice({
  name: "regRecStep",
  initialState,
  reducers: {
    updateData: (state, action) => {

      state.data= { ...state.data, ...action.payload };
    },
  clearSteps: (state) => {
      state.data = {};
    }
  },
});

// Export actions properly
export const { updateData, clearSteps } = regRecStepSlice.actions;
export default regRecStepSlice.reducer;