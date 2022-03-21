import { Router } from "express";
import { enemyController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/enemy')
    .get(isAuth ,controller.get)

export default router