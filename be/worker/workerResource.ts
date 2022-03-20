import { BuildingDatas, Buildings, ResourceDatas, Resources } from "models";
import { changeResources } from "wsServices";

const secInHour = 3600

export default async function workerResource () {
    const buildingDatas = (await BuildingDatas.find({resource : {$ne : null}})).map(o => o._id)

    const buildings = await Buildings.find({building : {$in : buildingDatas}})
    for (let index = 0; index < buildings.length; index++) {
        const building = buildings[index];
        const resource = await ResourceDatas.findById(building.resource)
        if(!resource) continue
        const userResource = await Resources.findOne({user : building.user , type : resource._id})
        if(!userResource) continue        
        const diffTime = (Date.now() - new Date(userResource.lastUpdate).getTime()) / 1000
        const percentDiffTimePerHour = diffTime / secInHour
        
        const generate = building.value
        const valueAfterDiff = generate * percentDiffTimePerHour
        userResource.value += valueAfterDiff
        userResource.lastUpdate = Date.now()

        await userResource.save()
        changeResources(userResource.user.toString())
                
    }
    
}