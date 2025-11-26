// ===============================
// ROOT TYPE
// ===============================

export type WebhookPayload =
  | WebhookMessageEvent
  | WebhookReactionEvent
  | WebhookMediaEvent
  | WebhookAckEvent
  | WebhookGroupParticipantsEvent
  | WebhookMessageDeletedEvent
  | WebhookMessageRevokedEvent;

// ===============================
// SHARED FIELDS
// ===============================

export interface WebhookBase {
  sender_id?: string;
  chat_id?: string;
  from?: string;
  timestamp?: string;
  pushname?: string;
}

// ===============================
// MESSAGE (TEXT / REPLY)
// ===============================

export interface WebhookMessage {
  text: string;
  id: string;
  replied_id?: string;
  quoted_message?: string;
}

export interface WebhookMessageEvent extends WebhookBase {
  message: WebhookMessage;
  reaction?: undefined;
  image?: undefined;
  video?: undefined;
  audio?: undefined;
  document?: undefined;
  sticker?: undefined;
  event?: undefined;
  action?: undefined;
}

// ===============================
// REACTION MESSAGE
// ===============================

export interface WebhookReaction {
  message: string;
  id: string;
}

export interface WebhookReactionEvent extends WebhookBase {
  reaction: WebhookReaction;
  message: WebhookMessage;
  image?: undefined;
  video?: undefined;
  audio?: undefined;
  document?: undefined;
  sticker?: undefined;
  event?: undefined;
  action?: undefined;
}

// ===============================
// MEDIA (IMAGE / VIDEO / AUDIO / DOCUMENT / STICKER)
// ===============================

export interface WebhookMedia {
  media_path: string;
  mime_type: string;
  caption?: string;
}

export interface WebhookMediaEvent extends WebhookBase {
  message: WebhookMessage;
  image?: WebhookMedia;
  video?: WebhookMedia;
  audio?: WebhookMedia;
  document?: WebhookMedia;
  sticker?: WebhookMedia;
  reaction?: undefined;
  event?: undefined;
  action?: undefined;
}

// ===============================
// MESSAGE ACK EVENT
// ===============================

export interface WebhookAckEvent {
  event: "message.ack";
  payload: {
    chat_id: string;
    ids: string[];
    receipt_type: string;
    receipt_type_description: string;
  };
}

// ===============================
// GROUP PARTICIPANTS EVENT
// ===============================

export interface WebhookGroupParticipantsEvent {
  event: "group.participants";
  payload: {
    chat_id: string;
    type: "join" | "leave" | "promote" | "demote";
    jids: string[];
  };
}

// ===============================
// MESSAGE DELETED
// ===============================

export interface WebhookMessageDeletedEvent {
  action: "message_deleted_for_me";
  deleted_message_id: string;
}

// ===============================
// MESSAGE REVOKED
// ===============================

export interface WebhookMessageRevokedEvent {
  action: "message_revoked";
  revoked_message_id: string;
}
