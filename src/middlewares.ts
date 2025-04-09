import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";
import { API_KEY } from "./config";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  console.log("errrrrrrrrrr");
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export function apiKeyAuth(
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  // Get API key from request headers, query parameters, or request body
  const apiKey =
    req.headers["x-api-key"] || req.query.apiKey || req.body.apiKey;

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }

  next();
}
