import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async (credentials) => {
  const response = await axios.post(
    'https://test-api.chargeonsite.com/user/login/admin',
    credentials
  );
  return response.data;
});
