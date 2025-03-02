import { Router } from "express";
import { validateCsrftoken } from "../lib/csrf";
import auth from "../middlewares/auth";
import { createAnswerHandler, getSingleAnswerQueryHandler, multiFeedQueryHandler, updateAnswerHandler } from "../controllers/answer.controller";

const router = Router()

router.post('/', validateCsrftoken, auth, createAnswerHandler)

router.get('/', multiFeedQueryHandler)

router.route('/:aid')
  .put(validateCsrftoken, auth, updateAnswerHandler)
  .get(getSingleAnswerQueryHandler)
  // TODO: .delete()


export default router;