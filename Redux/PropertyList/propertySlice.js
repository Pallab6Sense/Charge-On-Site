import { createSlice } from '@reduxjs/toolkit';
import { fetchProperties } from './propertyAction';
const initialState = {
  propertyData: [],
  status: 'idle',
  error: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    removePropertyData(state) {
      state.propertyData = null;
    },
  },
  extraReducers: {
    [fetchProperties.pending]: (state, action) => {
      state.status = true;
    },
    [fetchProperties.fulfilled]: (state, action) => {
      state.status = false;
      state.propertyData = action.payload;
    },
    [fetchProperties.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const {removePropertyData}=propertiesSlice.actions
export default propertiesSlice.reducer;
