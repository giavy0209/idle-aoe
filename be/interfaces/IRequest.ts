import { Request } from "express";

export default interface IRequest extends Request{
    _id? :any
}