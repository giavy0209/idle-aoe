import { Router } from "express";
import { resourceController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/resources')
    .get(isAuth ,controller.get)
export default router