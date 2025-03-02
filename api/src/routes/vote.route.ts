import { Router } from "express";
import { validateCsrftoken } from "../lib/csrf.js";
import auth from "../middlewares/auth.js";
import { voteChangeMutationHandler } from "../controllers/vote.controller.js";

const router = Router()

router.post('/:answer_id/vote_change', validateCsrftoken, auth, voteChangeMutationHandler)

export default router