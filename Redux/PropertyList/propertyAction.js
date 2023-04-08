import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let current;

export const getCurrent = (number) => {
  current = number;
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (token) => {
    console.log('token', token);
    const response = await axios.get(
      `https://test-api.chargeonsite.com/property?current=1&pageSize=${current}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
