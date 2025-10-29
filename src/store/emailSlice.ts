import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Email } from '../types';
import { emailServices } from '../services/emailService'
import { ApiError } from '../types/api';

interface EmailState {
  data: Email[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedEmail: Email | null;
}

const initialState: EmailState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
  selectedEmail: null,
};

// ✅ fetchEmails — con soporte de filtros y backend real
export const fetchEmails = createAsyncThunk<
  Email[],
  { category?: string; startDate?: string; endDate?: string } | undefined,
  { rejectValue: ApiError }
>('emails/fetchEmails', async (filters = {}, { rejectWithValue }) => {
  try {
    const res = await emailServices.list(filters);
    return res.results;
  } catch (err: any) {
    return rejectWithValue({
      message: err.response?.data?.detail || 'Error al obtener los correos',
      status: err.response?.status,
    });
  }
});

// ✅ fetchEmailById — para el modal de detalle (si quieres cargarlo directo del backend)
export const fetchEmailById = createAsyncThunk<
  Email,
  number,
  { rejectValue: ApiError }
>('emails/fetchEmailById', async (id, { rejectWithValue }) => {
  try {
    const res = await emailServices.getById(id);
    return res.email;
  } catch (err: any) {
    return rejectWithValue({
      message: err.response?.data?.detail || 'Error al obtener el correo',
      status: err.response?.status,
    });
  }
});

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    selectEmail(state, action: PayloadAction<Email | null>) {
      state.selectedEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchEmails
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length; // o res.total si el backend lo devuelve
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error cargando correos';
      })

      // fetchEmailById
      .addCase(fetchEmailById.fulfilled, (state, action) => {
        state.selectedEmail = action.payload;
      });
  },
});

export const { selectEmail } = emailSlice.actions;
export default emailSlice.reducer;
