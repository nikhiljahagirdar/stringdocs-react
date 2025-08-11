import { createSlice } from "@reduxjs/toolkit";
import { FaBullseye } from "react-icons/fa";

const initialState = {
  step1: {
    isValid: false,
    data: {
      title: "",
      description: "",
      location: "",
      isWordWide: false,
      jobType: "",
      workspace: "",
      category: "",
      isFeatured: false,
      expMin: "",
      expMax: "",
      expTerm: "",
      salaryRange: "",
      salaryCurrency: "",
      skills: [],
      isExternalLink: false,
      externalLink: "",
      countryRestrictions: [],
      postedBy: "",
      companyId: "",
    },
  },
  step2: {
    isValid: false,
    data: [],
  },
};

const jobStepSlice = createSlice({
  name: "jobSteps",
  initialState,
  reducers: {
    updateStep1: (state, action) => {
      state.step1.data = { ...state.step1.data, ...action.payload };
    },
    clearStep1: (state) => {
      state.step1.data = {};
    },
    updateStep2: (state, action) => {
      state.step2.data = { ...state.step2.data, ...action.payload };
    },
    clearStep2: (state) => {
      state.step2.data = {};
    },
  },
});


export const { updateStep1, clearStep1,updateStep2,clearStep2 } = jobStepSlice.actions;
export default jobStepSlice.reducer;
