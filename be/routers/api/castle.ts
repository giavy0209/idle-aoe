import { Router } from "express";
import { castleController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/castles')
    .get(isAuth, controller.get)

router.route('/castle')
    .get(isAuth, controller.getOne)

router.route('/castle/ghost')
    .get(isAuth, controller.getGhost)
export default router