export interface Attachment {
  filename: string;
  url: string;
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
