export interface SessionDoc {
  sessionId: string;
  userId: string;
  lastActivity: Date;
  expiresAt: Date;
}
