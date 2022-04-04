import { Router } from "express";
import { authController as controller } from 'controllers'
import { isAuth } from "../../middleware";

const router = Router()

router.route('/auth')
    .post(controller.auth)
router.route('/signup')
    .post(controller.signup)

router.route('/valid-jwt')
    .get(isAuth,controller.isValidJWT)

async function  create() {
    await controller.create()
    console.log('done');
    
    // for (let index = 0; index < 100; index++) {
    //     console.log(index);
        
    //     await controller.signup({
    //         body : {
    //             username : `user-${index}`,
    //             password : `${index}`,
    //             world : '623e0f549c7a54a2c0fc90b0'
    //         }
    //     } , null)
        
    // }
}
create()
export default router