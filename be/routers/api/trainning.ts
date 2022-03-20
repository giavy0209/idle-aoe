import { Router } from "express";
import { trainningController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/trainning')
    .get(isAuth ,controller.get)
    .post(isAuth ,controller.post)
router.route('/trainning-queue')
    .get(isAuth , controller.getTrainningQueue)
export default router