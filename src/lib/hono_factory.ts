import { createFactory } from "hono/factory";

type Env = {
  Variables: {};
};

const honoFactory = createFactory<Env>();

export default honoFactory;
