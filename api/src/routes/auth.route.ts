import { Router } from "express";
import { createAccountHandler, emailAvailableHandler, loginHandler, sendEmailConfirmationEmailHandler, verfyEmailConfirmationCodeHandler } from "../controllers/auth.controller";

const router = Router()

router.post('/signup', createAccountHandler)

router.post('/login', loginHandler)

router.post('/send_confirmation_email', sendEmailConfirmationEmailHandler)

router.post('/verify_email_confirmation_code', verfyEmailConfirmationCodeHandler)

router.get('/email_available', emailAvailableHandler)

export default router