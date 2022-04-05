import { Router } from "express";
import { authController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/auth')
    .post(controller.auth)
router.route('/signup')
    .post(controller.signup)

router.route('/valid-jwt')
    .get(isAuth,controller.isValidJWT)

export default router