import { Router } from "express";
const router = Router();
import * as authController from './controller/registration.js'
import { validation } from "../../middleware/validation.js";
import * as validator from './auth.validation.js'

router.post("/signup",validation(validator.signupValidator) ,authController.signUp)
router.post("/login",validation(validator.loginValidator),authController.login)

export default router