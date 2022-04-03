import { Router } from "express";
import { castleController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/castles')
    .get(isAuth, controller.get)

router.route('/castle')
    .get(isAuth, controller.getOne)
export default router