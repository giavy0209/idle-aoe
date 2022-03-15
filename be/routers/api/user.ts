import { Router } from "express";
import { userController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/user')
    .get(isAuth,controller.get)

export default router