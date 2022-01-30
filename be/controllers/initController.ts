import {Request,Response} from "express";
import {model} from 'mongoose'

const InitModel = model('inits')

class InitControllers {
    static async getSomething(req : Request,res : Response) {
        
        res.send('send data here')
    }

    static async postSomething(req : Request,res : Response) {
        
        res.send('send data here')
    }
}

export default InitControllers