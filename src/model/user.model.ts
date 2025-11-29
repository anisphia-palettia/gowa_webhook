import type { ObjectId } from "mongodb";

export enum UserRole {
  "admin",
  "user",
}

export interface UserModel {
  _id: ObjectId;
  name: string;
  username: string;
  password: string;
  role: UserRole;
}
