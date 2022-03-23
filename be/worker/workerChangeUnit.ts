import { Units } from "models";
import {  Types } from "mongoose";
import { changeUnit } from "wsServices";

interface IChangeUnit {
    unit : Types.ObjectId | string,
    newValue : number,
    overwrite ? : boolean
}
export const CHANGE_UNIT: IChangeUnit[] = []

export default async function workerChangeUnit() {
    const cloneArray = [...CHANGE_UNIT]
    const promiseSave : any = []
    const userId : string[] = []

    for (let index = 0; index < cloneArray.length; index++) {
        const {unit , newValue , overwrite} = cloneArray[index];
        
        const findUnit = await Units.findById(unit)
        if(!findUnit) continue
        if(overwrite) {
            findUnit.total = newValue
        }else {
            findUnit.total += newValue
        }
        promiseSave.push(findUnit.save()) 

        if(!userId.includes(findUnit.user.toString())) userId.push(findUnit.user.toString())
    }

    await Promise.all(promiseSave)
    CHANGE_UNIT.splice(0,cloneArray.length)

    userId.forEach(_id => {
        changeUnit(_id)
    })

}