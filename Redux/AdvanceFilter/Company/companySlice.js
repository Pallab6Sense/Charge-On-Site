import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanies } from './companyAction';
const initialState = {
  companyData: [],
  status: 'idle',
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    removePropertyData(state) {
      state.propertyData = null;
    },
  },
  extraReducers: {
    [fetchCompanies.pending]: (state, action) => {
      state.status = true;
    },
    [fetchCompanies.fulfilled]: (state, action) => {
      state.status = false;
      state.companyData = action.payload;
    },
    [fetchCompanies.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

// export const {removePropertyData}=propertiesSlice.actions
export default companiesSlice.reducer;
