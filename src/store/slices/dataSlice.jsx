import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const API_BASE_URL = 'https://localhost:8000';

// Fetch data functions
export const fetchCategories = createAsyncThunk('data/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sub`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchIndustries = createAsyncThunk('data/fetchIndustries', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/industry/all`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchCountry = createAsyncThunk('data/fetchCountry', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/country/all`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchSalaryRanges = createAsyncThunk('data/fetchSalaryRanges', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salaryrange`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchWorkspaces = createAsyncThunk('data/fetchWorkspaces', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workspace`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchJobTypes = createAsyncThunk('data/fetchJobTypes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobtype`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    category: [],
    industry: [],
    country: [],
    salaryRanges: [],
    workspaces: [],
    jobTypes: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.category=[...action.payload];
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.industry = [...action.payload];
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.country = [...action.payload];
      })
      .addCase(fetchSalaryRanges.fulfilled, (state, action) => {
        state.salaryRanges = [...action.payload];
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspaces =[...action.payload];
      })
      .addCase(fetchJobTypes.fulfilled, (state, action) => {
        state.jobTypes = [...action.payload];
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      );
  },
});

export default dataSlice.reducer;
