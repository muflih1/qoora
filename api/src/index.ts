import "dotenv/config"
import express, { Application, Request, Response } from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { getEnv } from "./env.js"
import { connectDatabase } from "./config/db.js"

import authRouter from "./routes/auth.route.js"
import { deserializeSession } from "./lib/session.js"
import auth from "./middlewares/auth.js"
import { UserRepository } from "./repositories/UserRepository.js"
import { csrf, validateCsrftoken } from "./lib/csrf.js"
import questionRouter from "./routes/question.route.js"
import answerRouter from "./routes/answer.route.js"
import voteRouter from "./routes/vote.route.js"
import BadRequestError from "./errors/BadRequestError.js"
import path from "path"

const app: Application = express()

app.use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }))
  .use(cors({
    origin: getEnv('WEB_CLIENT_URI'),
    credentials: true
  }))
  .use(morgan('common'))
  .use(csrf)
  .use(deserializeSession)

const userRepository = UserRepository.getInstance()

app.use('/media', express.static(path.join(import.meta.dirname, '../public/media/')))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/questions', questionRouter)
app.use('/api/v1/answers', answerRouter)
app.use('/api/v1/votes', voteRouter)
app.get('/api/v1/auth/viewer', validateCsrftoken, auth, async (req, res) => {
  const user = await userRepository.getById(req.userId)
  res.send({ viewer: {...user, password_digest: undefined} })
})

app.use((err: any, req: Request, res: Response, next: () => void) => {
  console.error(`PATH ${req.path}:`, err)

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ status: 'fail', error: { code: err.errorCode, message: err.message } }) as any
  }

  res.status(500).send(err)
})

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

const PORT = getEnv('PORT', '8000')
app.listen(PORT, async () => {
  console.log('App running at http://127.0.0.1:%d', PORT)
  await connectDatabase()
})