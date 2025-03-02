import crypto from "crypto"
import cookie from "cookie"
import { getEnv } from "../env.js"
import { NextFunction, Request, Response } from "express"
import { SessionRepository, SessionTable } from "../repositories/SessionRepository.js"
import { snowflake } from "./snowflake.js"

declare global {
  namespace Express {
    interface Request {
      userId: bigint
      session: SessionTable
    }
  }
}

function generateOpaqueToken() {
  return crypto.randomBytes(64).toString('base64').replace(/[+/=]/g, '').normalize()
}

function hash(opaqueToken: string) {
  const digest = crypto.createHmac('sha256', getEnv('SESSION_SECRET')).update(opaqueToken).digest('base64')
  return digest
}

const sessionRepository = new SessionRepository()

async function deserializeSession(req: Request, res: Response, next: NextFunction) {
  const cookie = _getcookie(req)
  if (!cookie) {
    return next()
  }
  const token = hash(cookie)
  try {
    let session = await sessionRepository.getOneBy({ token_digets: token })
    if (!(session && session.expires.getTime() > Date.now())) {
      if (session) {
        await sessionRepository.delete(session.id)
      }
      clearSessionCookie(res)
      return next()
    }

    const updates: Partial<SessionTable> = {}

    const lastActivityUpdateThreshold = 1000 * 60 * 60 * 1
    if (Date.now() - session.last_activity_time.getTime() < lastActivityUpdateThreshold) {
      updates.last_activity_time = new Date()
    }

    const refreshThreshold = 1000 * 60 * 60 * 24
    if (Date.now() - session.last_refreshed.getTime() > refreshThreshold) {
      const token = generateOpaqueToken()
      const digest = hash(token)
      updates.token_digets = digest
      updates.last_refreshed = new Date()
      createSessionCookie(res, token)
    }

    const slideThreshold = 1000 * 60 * 60 * 24 * 15
    if (session.expires.getTime() - Date.now() < slideThreshold) {
      updates.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }

    if (Object.keys(updates).length > 0) {
      session = await sessionRepository.update(session.id, updates)
    }

    if (!session) return next()

    req.userId = session.user_id
    req.session = session

    return next()

  } catch (error) {
    console.log('deserializeSession:', error)
    return next()
  }
}

type CreateSessionParams = {
  userId: bigint
  userAgent?: string
  ipAddress?: string
}

async function createSession({
  userId,
  userAgent,
  ipAddress
}: CreateSessionParams) {
  const token = generateOpaqueToken()
  const digest = hash(token)
  const session = await sessionRepository.create({
    id: snowflake.nextId(),
    user_id: userId,
    token_digets: digest,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    last_activity_time: new Date(),
    last_refreshed: new Date(),
    ip_address: ipAddress,
    user_agent: userAgent
  })
  return { token, session }
}

function _getcookie(req: Request) {
  const header = req.headers.cookie
  if (!header) return
  const raw = cookie.parse(header)
  return raw['SID']
}

function createSessionCookie(res: Response, val: string) {
  const data = cookie.serialize('SID', val, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 364),
    secure: getEnv('NODE_ENV') === "production",
    sameSite: "none"
  })
  _setcookie(res, data)
}

function clearSessionCookie(res: Response) {
  const expires = new Date("Thu, 01 Jan 1970 00:00:01 GMT")
  const data = cookie.serialize('SID', 'deleted', {
    path: '/',
    httpOnly: true,
    expires,
    maxAge: Math.floor((expires.getTime() - Date.now()) / 1000),
    secure: getEnv('NODE_ENV') === "production",
    sameSite: "none"
  })
  _setcookie(res, data)
}

function _setcookie(res: Response, data: string) {
  const prev = res.getHeader('Set-Cookie') || []
  const header = Array.isArray(prev) ? prev.concat(data) : [prev, data]
  res.setHeader('Set-Cookie', String(header))
}

export { deserializeSession, createSession, createSessionCookie, clearSessionCookie }