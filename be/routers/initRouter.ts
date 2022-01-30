import {Express} from "express";
import InitControllers from '../controllers/initController'
module.exports = function initRoute (router : Express) {
    router.get('/get-something' , InitControllers.getSomething)
    router.post('/post-something' , InitControllers.postSomething)
}