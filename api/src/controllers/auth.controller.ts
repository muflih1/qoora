import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository.js";
import { snowflake } from "../lib/snowflake.js";
import bcrypt from "bcryptjs"
import { createSession, createSessionCookie } from "../lib/session.js";
import { catchAsync } from "../utils/catchAsync.js";
import BadRequestError from "../errors/BadRequestError.js";

const userRepository = UserRepository.getInstance()

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