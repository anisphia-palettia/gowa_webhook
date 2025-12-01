import type { Collection } from "mongodb";
import { MongoDB } from "./mongodb";
import type { RefreshTokenDoc } from "../model/refresh_token";

export default class RefrehTokenCollection extends MongoDB {
  private static _instance: RefrehTokenCollection;
  private _collection: Collection<RefreshTokenDoc> | null = null;

  private constructor() {
    super();
  }
}
