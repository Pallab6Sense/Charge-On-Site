// import { axiosInstance } from '@/Axios/axiosInstance';
import axiosInstance from '@/Axios/interceptors';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async (credentials) => {
  const response = await axios.post(
    'https://test-api.chargeonsite.com/user/login/admin',
    credentials
  );
  return response.data;
});

// console.log("++++",axiosInstance.get('/user/me'));
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  }
);
