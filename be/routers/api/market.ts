import { Router } from "express";
import { marketController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/market')
    .get(isAuth ,controller.get)
    .post(isAuth, controller.post)
export default router