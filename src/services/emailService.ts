import { api } from './api';
import { EmailListResponse, EmailDetailResponse } from '../types/api';

export const emailServices = {
  async list(params?: { category?: string; startDate?: string; endDate?: string }) {
    const response = await api.get<EmailListResponse>('/emails/list', { params });
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<EmailDetailResponse>(`/emails/${id}`);
    return response.data;
  },
};
