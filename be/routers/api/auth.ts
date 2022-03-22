import { Router } from "express";
import { authController as controller } from 'controllers'

const router = Router()

router.route('/auth')
    .post(controller.auth)
router.route('/signup')
    .post(controller.signup)

async function  create() {
    for (let index = 0; index < 100; index++) {
        console.log(index);
        
        await controller.signup({
            body : {
                username : `user ${index}`,
                password : `${index}`
            }
        } , null)
        
    }
}
// create()
export default router