export interface RefreshTokenDoc {
  _id: string;
  userId: string;
  hashedToken: string;
  expiresAt: Date;
  createdAt: Date;
}
