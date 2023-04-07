import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (token) => {
    const response = await axios.get(
      "https://test-api.chargeonsite.com/property?current=1&pageSize=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
