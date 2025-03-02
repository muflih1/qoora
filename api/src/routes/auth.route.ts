import { Router } from "express";
import { 
  createAccountHandler, 
  loginHandler, 
} from "../controllers/auth.controller.js";

const router = Router()

router.post('/signup', createAccountHandler)

router.post('/login', loginHandler)

export default router