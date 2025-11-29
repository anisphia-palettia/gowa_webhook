import { createFactory } from "hono/factory";
import type { JwtPayload } from "../type/jwt_payload.type";

type Env = {
  Variables: {
    payload: JwtPayload;
  };
};

const honoFactory = createFactory<Env>();

export default honoFactory;
