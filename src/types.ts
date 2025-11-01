export interface Attachment {
  file_name: string;
  file_url: string;
  content_type: string;
}

export interface Email {
  id: number;
  sender: string;
  subject: string;
  received_at: string;
  classification_code?: string;
  body?: string;
  attachments?: Attachment[];
}
