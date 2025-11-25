// webhook.types.ts

export type WebhookEvent =
  | "group.participants"
  | "message.ack"
  | "message_edited"
  | "message_deleted"
  | string; // agar fleksibel bila ada event lain

export interface WebhookBase {
  event: WebhookEvent;
  timestamp?: string; // rilis group event punya timestamp :contentReference[oaicite:6]{index=6}
  payload: any;
}

// Payload untuk event group.participants
export interface GroupParticipantsPayload {
  chat_id: string;
  type: "join" | "leave" | "promote" | "demote";
  jids: string[];
}

// Payload untuk ack / receipt pesan
export interface AckPayload {
  chat_id: string;
  receipt_type: string;
  ids: string[]; // id pesan
  receipt_type_description?: string;
}

// Payload untuk edit pesan
export interface MessageEditedPayload {
  chat_id: string;
  message_id: string;
  original_message_id?: string; // karena rilis menyebut `original_message_id` :contentReference[oaicite:7]{index=7}
  // bisa ada data baru (edited body, timestamp, dsb)
  [key: string]: any;
}

// Payload untuk delete / revoke pesan
export interface MessageDeletedPayload {
  chat_id: string;
  message_id: string;
  // bisa tambahkan field lain jika implementasinya lebih detail
  [key: string]: any;
}

// Payload untuk pesan baru (message received)
export interface MessagePayload {
  id: string;
  chat_id: string;
  from: string;
  to: string;
  type: string; // misal "text", "image", dsb
  body?: string;
  timestamp: string;
  // jika ada media, bisa ada fields lain seperti `media_url`, `mime_type`, dsb
  [key: string]: any;
}

export interface WebhookData {
  event: WebhookEvent;
  timestamp?: string;
  payload:
    | GroupParticipantsPayload
    | AckPayload
    | MessageEditedPayload
    | MessageDeletedPayload
    | MessagePayload
    | any; // fallback
}
