import { Resources } from "models";
import { Types } from "mongoose";
import { changeResources } from "wsServices";

interface IChangeResource {
    resource :  Types.ObjectId | string,
    newValue : number,
    lastUpdate ? : number | Date,
}

export const CHANGE_RESOURCE: IChangeResource[] = []

async function workerChangeResource() {
    const cloneArray = [...CHANGE_RESOURCE]
    const promiseSave : any = []
    
    const userId : string[] = []

    for (let index = 0; index < cloneArray.length; index++) {
        const {resource , newValue,lastUpdate} = cloneArray[index];
        const findResource = await Resources.findById(resource)
        if(!findResource) continue
        findResource.value += newValue
        if(lastUpdate) {
            findResource.lastUpdate = lastUpdate
        }
        promiseSave.push(findResource.save())
        if(!userId.includes(findResource.user.toString())) userId.push(findResource.user.toString())
    }
    await Promise.all(promiseSave)
    CHANGE_RESOURCE.splice(0,cloneArray.length )

    userId.forEach(_id => {
        changeResources(_id)
    })

    
}

export default workerChangeResource 