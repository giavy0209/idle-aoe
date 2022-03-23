import { Router } from "express";
import { battleController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/battle')
    .get(isAuth ,controller.get)
export default router