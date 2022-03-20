import { BuildingDatas, Buildings } from "../models";
import { changeBuilding } from "wsServices";

export default async function workerBuilding() {
    const buildings = await Buildings.find({isUpgrade : true , finishAt : {$lte : Date.now()}})
    for (let index = 0; index < buildings.length; index++) {
        const building = buildings[index];
        const buildingData = await BuildingDatas.findById(building.building)
        const buildingLevel = building.level + 1
        const findUpgrade = buildingData?.upgrade.find(o => o.level === buildingLevel)
        if(!buildingData || !findUpgrade) continue

        building.isUpgrade = false
        building.level ++
        building.value = findUpgrade.generate
        await building.save()
        changeBuilding(building.user.toString())
    }
}

