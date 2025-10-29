import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const fetchEmails = createAsyncThunk('emails/fetchEmails', async (params = {}) => {
  const res = await axios.get(`${API_URL}/emails/list`, { params });
  return res.data;
});

const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedEmail: null,
  },
  reducers: {
    selectEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectEmail } = emailSlice.actions;
export default emailSlice.reducer;
