import { Router } from "express";
import { marketController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/market')
    .get(isAuth ,controller.get)
    .post(isAuth, controller.post)
    
router.route('/market/clan')
    .get(isAuth, controller.getClan)

router.route('/market/clan/:id')
    .put(isAuth, controller.putClan)

router.route('/market/caravan')
    .post(isAuth , controller.postCaravan)
export default router