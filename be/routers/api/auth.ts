import { Router } from "express";
import { authController as controller } from 'controllers'

const router = Router()

router.route('/auth')
    .post(controller.auth)
router.route('/signup')
    .post(controller.signup)

export default router