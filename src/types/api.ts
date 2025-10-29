import { Email } from '../types';

export interface ApiError {
  detail?: string;
  message?: string;
  status?: number;
}

export interface EmailListResponse {
  results: Email[];
  total: number;
}

export interface EmailDetailResponse {
  email: Email;
}
