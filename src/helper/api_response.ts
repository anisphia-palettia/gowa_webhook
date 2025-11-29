import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
  token?: string;
}

const success = <T>(
  c: Context,
  {
    message,
    data,
    token,
    status = 200,
  }: {
    message: string;
    data?: T;
    token?: string;
    status?: ContentfulStatusCode;
  },
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(token ? { token } : {}),
  };

  return c.json(response, status);
};

const error = (
  c: Context,
  {
    message,
    error,
    status = 500,
  }: {
    message: string;
    error?: unknown;
    meta?: Record<string, unknown>;
    status?: ContentfulStatusCode;
  },
) => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(error ? { error } : {}),
  };

  return c.json(response, status);
};

export default {
  success,
  error,
};
