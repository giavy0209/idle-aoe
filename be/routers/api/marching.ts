import { Router } from "express";
import { marchingController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/marching')
    .get(isAuth ,controller.get)
    .post(isAuth ,controller.attack)
router.route('/marching/return')
    .post(isAuth , controller.return)

export default router