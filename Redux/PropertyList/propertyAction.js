import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let current;

export const getCurrent = (number) => {
  current = number;
};

let searchQuery = '';

export const getSearchQuery = (search) => {
  searchQuery = search;
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (token) => {
    const response = await axios.get(
      `https://test-api.chargeonsite.com/property?current=1&pageSize=${current}&search=${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
