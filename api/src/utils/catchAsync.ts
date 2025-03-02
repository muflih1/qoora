import { NextFunction, Request, Response } from "express";

export function catchAsync<T>(callback: (req: Request, res: Response, next: NextFunction) => Promise<T>) {
  return function handler(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(callback(req, res, next)).catch(next)
  }
}