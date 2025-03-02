import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import cookie from "cookie"
import { getEnv } from "../env.js";

declare global {
  namespace Express {
    interface Request {
      csrftoken: string
    }
  }
}

export function csrf(req: Request, res: Response, next: NextFunction) {
  let token = _getcookie(req);
  if (!token) {
    token = _generateToken()
    _setcookie(res, token)
  }
  req.csrftoken = token
  return next()
}

export function validateCsrftoken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['x-csrftoken']
  if (!(header && header === req.csrftoken)) {
    return res.status(403).json({ error: { message: 'CSRF token missing or incorrect', status: 'fail' } }) as any
  }
  return next()
}

function _generateToken() {
  return crypto.randomBytes(32)
    .toString("base64")
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 32);
}

function _getcookie(req: Request) {
  const header = req.headers.cookie;
  if (!header) return
  const raw = cookie.parse(header)
  return raw.csrftoken
}

function _setcookie(res: Response, val: string) {
  const data = cookie.serialize("csrftoken", val, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 364),
    secure: getEnv('NODE_ENV') === "production",
    sameSite: 'lax',
    httpOnly: false
  })

  const prev = res.getHeader("Set-Cookie") || []
  const header = Array.isArray(prev) ? prev.concat(data) : [prev, data]

  res.setHeader("Set-Cookie", String(header))
}