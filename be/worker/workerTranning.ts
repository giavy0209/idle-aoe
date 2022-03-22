import { BuildingDatas, Buildings, Trainnings, UnitDatas, Units } from "models";
import { changeTrainningQueue, changeUnit } from "wsServices";

export default async function workerTranning () {
    const trainnings = await Trainnings.find({finishAt : {$lte : Date.now()}})
    .populate('unit userBuilding')
    
    for (let index = 0; index < trainnings.length; index++) {
        const trainning = trainnings[index];
        trainning.total--

        const building = trainning.userBuilding
        const unitData = trainning.unit
        
        const dereaseTime = building.value / 100
        const time = unitData.time - unitData.time * dereaseTime
        
        const finishAt = Date.now() + time * 1000 
        trainning.finishAt = finishAt
        trainning.time = Date.now() + time * 1000 * trainning.total
        await trainning.save()

        const unit = await Units.findOne({user : trainning.user ,unit : trainning.unit })
        if(!unit) continue

        unit.total++
        await unit.save()
        if(trainning.total === 0) {
            await trainning.delete()
        }
        changeTrainningQueue(trainning.user.toString())
        changeUnit(trainning.user.toString())
    }
}