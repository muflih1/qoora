import { Router } from "express";
import { 
  createQuestionHandler, 
  getQuestionHandler, 
  listAnswersByQuestionHandler, 
  listQuestionsHandler, 
  relatedQuestionsHandler, 
  searchQuestionsHandler, 
  updateQuestionHandler 
} from "../controllers/question.controller.js";
import { validateCsrftoken } from "../lib/csrf.js";
import auth from "../middlewares/auth.js";

const router = Router()

router.get('/results', searchQuestionsHandler)

router.route('/')
.post(validateCsrftoken, auth, createQuestionHandler)
.get(listQuestionsHandler)

router.get('/:qid/related', relatedQuestionsHandler)

router.get('/:qid/answers', listAnswersByQuestionHandler)

router.route('/:qid')
  .get(getQuestionHandler)
  .put(validateCsrftoken, auth, updateQuestionHandler)
  .delete(validateCsrftoken, auth, updateQuestionHandler)

export default router;