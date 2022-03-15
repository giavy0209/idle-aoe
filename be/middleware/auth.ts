import {Request , Response , NextFunction} from 'express'
import { IRequest } from 'interfaces';
import { verify } from 'jsonwebtoken'

const auth = async function(req : IRequest, res : Response, next : NextFunction) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        try {
            var jwtToken =  req.headers.authorization.split(' ')[1];
            var payload : any = verify(jwtToken, global.Config.JWT);
            req['_id'] = payload['_id']
            next();
        } catch (error) {
            return res.send({status : 401})
        }
    } else {
        return res.send({status : 401})
    }
};

export default auth