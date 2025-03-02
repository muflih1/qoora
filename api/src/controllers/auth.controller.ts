import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository.js";
import { snowflake } from "../lib/snowflake.js";
import bcrypt from "bcrypt"
import { createSession, createSessionCookie } from "../lib/session.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendVerificationEmail } from "../utils/mailer.js";
import { db } from "../config/db.js";
import BadRequestError from "../errors/BadRequestError.js";

const userRepository = UserRepository.getInstance()

export const emailAvailableHandler = catchAsync(async (req, res) => {
  const { email } = req.query
  const user = await userRepository.getOneBy({ email: email as string })
  return res.status(200).json({ status: 'ok', available: user == null ? true : false })
})

export const sendEmailConfirmationEmailHandler = catchAsync(async (req, res) => {
  const { email } = req.body
  const verificationCode = Math.floor(999999 * Math.random())
  await db.query('INSERT INTO email_verification_codes (email, verification_code) VALUES ($1, $2)', [email, verificationCode])
  sendVerificationEmail(email, verificationCode.toString())
  return res.status(200).json({ status: 'ok' })
})

export const verfyEmailConfirmationCodeHandler = catchAsync(async (req, res) => {
  const { verification_code, email } = req.body
  const [verificationCode] = await db.query<{ email: string; verification_code: number; expires_at: string }>(`
    SELECT * FROM email_verification_codes WHERE email = $1 AND verification_code = $2
  `, [email, verification_code])
  if (!verificationCode) {
    throw new BadRequestError('The code you entered is wrong. Please try again.')
  }
  const isExpired = new Date(verificationCode.expires_at).getTime() <= Date.now()
  if (isExpired) {
    throw new BadRequestError('The code you entered has expired. Please request a new code.')
  }
  await db.query('DELETE FROM email_verification_codes WHERE email = $1 AND verification_code = $2', [email, verification_code])
  return res.status(200).json({ status: 'ok' })
})

export const createAccountHandler = catchAsync(async function (req, res, next) {
  const { given_name, email, password } = req.body

  const id = snowflake.nextId()
  const salt = await bcrypt.genSalt(12)
  const digest = await bcrypt.hash(password, salt)

  try {
    const user = await userRepository.create({
      id,
      given_name,
      email,
      password_digest: digest
    })
    const { token } = await createSession({
      userId: user.id,
      ipAddress: req.socket.remoteAddress ?? req.ip,
      userAgent: req.headers['user-agent']
    })
    createSessionCookie(res, token)

    res.status(201).json({
      status: 'ok',
      userId: user.id,
      authenticated: true,
    })
  } catch (err: any) {
    if (err.code === '23505') {
      throw new BadRequestError('Account already exists with taht e-email address')
    }
    next(err)
  }
})

export const loginHandler = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await userRepository.getOneBy({ email })
  if (!(user && await bcrypt.compare(password, user.password_digest))) {
    throw new BadRequestError('Invalid credentials')
  }
  const { token } = await createSession({
    userId: user.id,
    ipAddress: req.socket.remoteAddress ?? req.ip,
    userAgent: req.headers['user-agent']
  })
  createSessionCookie(res, token)
  res.status(200).json({ user: true, userId: user.id, authenticated: true, status: 'ok' })
})