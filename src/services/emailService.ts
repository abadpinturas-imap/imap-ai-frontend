// src/services/emailService.ts
import { api } from './api';
import { EmailListResponse, EmailDetailResponse } from '../types/api';

const clean = (params?: Record<string, any>) =>
  Object.fromEntries(Object.entries(params ?? {}).filter(([, v]) => v && String(v).trim() !== ''));

export const emailService = {
  async list(params?: { category?: string; startDate?: string; endDate?: string }) {
    const { data } = await api.get<EmailListResponse>('/emails/list', { params: clean(params) });
    return data; // { results, total }
  },

  async getById(id: number) {
    const { data } = await api.get<EmailDetailResponse>(`/emails/${id}`);
    return data; // { email }
  },
};

export async function getAttachmentsByEmail(emailId: number) {
  const res = await api.get(`/emails/${emailId}/attachments`);
  return res.data;
}
