import axiosInstance from '@/Axios/interceptors';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async () => {
  const response = await axiosInstance.post('/user/login/admin');
  return response.data;
});

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  }
);
