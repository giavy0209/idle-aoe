import { Router } from "express";
import { marchingController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/marching')
    .post(isAuth ,controller.attack)

export default router