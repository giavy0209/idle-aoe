import { Router } from "express";
import { clanController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/clan')
    .get(isAuth ,controller.get)
    .post(isAuth , controller.post)

router.route('/clan/join/:id')
    .get(isAuth , controller.getJoin)
    .post(isAuth , controller.postJoin)
    .put(isAuth , controller.putJoin)
    .delete(isAuth , controller.deleteJoin)

router.route('/clan/:id')
    .get(isAuth , controller.getDetail)
    .patch(isAuth , controller.patchDetail)

router.route('/clan/user/:id')
    .delete(isAuth , controller.deleteUser)
export default router