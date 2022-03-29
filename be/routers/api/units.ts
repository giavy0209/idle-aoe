import { Router } from "express";
import { unitController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/units')
    .get(isAuth ,controller.get)
    .post(controller.post)
export default router