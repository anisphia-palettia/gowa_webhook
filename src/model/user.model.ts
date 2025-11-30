export enum UserRole {
  "admin",
  "user",
}

export interface UserDoc {
  name: string;
  username: string;
  password: string;
  role: UserRole;
}
