import { Router } from "express";
import { buildingController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/buildings')
    .get(isAuth ,controller.get)
export default router