import { Router } from "express";
import { worldsController as controller } from 'controllers'

const router = Router()

router.route('/worlds')
    .get(controller.get)

export default router