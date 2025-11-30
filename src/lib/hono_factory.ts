import { createFactory } from "hono/factory";

type Env = {
  Variables: {
    token: string;
    role: string;
  };
};

const honoFactory = createFactory<Env>();

export default honoFactory;
