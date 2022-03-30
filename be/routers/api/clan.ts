import { Router } from "express";
import { clanController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/clan')
    .get(isAuth ,controller.get)
    .post(isAuth , controller.post)

router.route('/clan/:id')
    .get(isAuth , controller.getDetail)
    .patch(isAuth , controller.patch)
export default router