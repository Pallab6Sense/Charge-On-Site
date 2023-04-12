import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async ({accessToken,searchText,pageSize,currentPage}) => {
    const response = await axios.get(
        `https://test-api.chargeonsite.com/company?pageSize=${pageSize}&current=${currentPage}&search=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);