import { Router } from "express";
import { upgradeController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/upgrade')
    .get(isAuth ,controller.get)
    .post(isAuth ,controller.post)

router.route('/upgrade/cancel')
    .post(isAuth , controller.cancel)
export default router