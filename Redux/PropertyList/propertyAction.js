import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let current;

export const getCurrent = (number) => {
  current = number;
};



export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({accessToken,search}) => {
    const response = await axios.get(
      `https://test-api.chargeonsite.com/property?current=1&pageSize=${current}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);
