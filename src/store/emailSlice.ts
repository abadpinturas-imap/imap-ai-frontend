import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Email } from '../types';
import { emailService } from '../services/emailService'; // ← OJO: nombre en singular, como tu archivo
import { ApiError, EmailListResponse } from '../types/api';

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

// ✅ Trae la lista con filtros opcionales y devuelve {results, total}
export const fetchEmails = createAsyncThunk<
  EmailListResponse,
  { category?: string; startDate?: string; endDate?: string } | undefined,
  { rejectValue: ApiError }
>('emails/fetchEmails', async (filters = {}, { rejectWithValue }) => {
  try {
    const res = await emailService.list(filters);
    return res; // { results, total }
  } catch (err: any) {
    return rejectWithValue({
      message: err?.response?.data?.detail || 'Error al obtener los correos',
      status: err?.response?.status,
    });
  }
});

// ✅ Trae el detalle por ID (útil si el modal pide info extra)
export const fetchEmailById = createAsyncThunk<
  Email,
  number,
  { rejectValue: ApiError }
>('emails/fetchEmailById', async (id, { rejectWithValue }) => {
  try {
    const res = await emailService.getById(id);
    return res.email;
  } catch (err: any) {
    return rejectWithValue({
      message: err?.response?.data?.detail || 'Error al obtener el correo',
      status: err?.response?.status,
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
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.total =
          typeof action.payload.total === 'number'
            ? action.payload.total
            : action.payload.results.length;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error cargando correos';
      })
      .addCase(fetchEmailById.fulfilled, (state, action) => {
        state.selectedEmail = action.payload;
      });
  },
});

export const { selectEmail } = emailSlice.actions;
export default emailSlice.reducer;
