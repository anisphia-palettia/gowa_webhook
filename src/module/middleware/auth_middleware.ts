import type { MiddlewareHandler } from "hono";
import honoFactory from "../../lib/hono_factory";

export const authMiddleware = honoFactory.createMiddleware(async (c, next) => {
  await next();
});
