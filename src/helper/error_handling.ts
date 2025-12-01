import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import api_response from "./api_response";
import z, { ZodError } from "zod";

export const errorHandling: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return api_response.error(c, {
      message: err.message,
      status: err.status,
    });
  }

  if (err instanceof ZodError) {
    return api_response.error(c, {
      message: "Validation Error",
      error: z.flattenError(err),
    });
  }

  return api_response.error(c, {
    message: "Internal server error",
    status: 400,
    error: err.message,
  });
};
