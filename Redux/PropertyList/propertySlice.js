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
    // add any extra reducers here
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

export default propertiesSlice.reducer;
