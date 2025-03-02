import { Router } from "express";
import { validateCsrftoken } from "../lib/csrf";
import auth from "../middlewares/auth";
import { voteChangeMutationHandler } from "../controllers/vote.controller";

const router = Router()

router.post('/:answer_id/vote_change', validateCsrftoken, auth, voteChangeMutationHandler)

export default router