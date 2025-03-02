import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.userId) {
    return res.status(403).json({error:{message: 'Authentication data required'}}) as any
  }
  next()
}