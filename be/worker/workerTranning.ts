import { BuildingDatas, Buildings, Trainnings, UnitDatas, Units, Users } from "models";
import { changeTrainningQueue, changeUnit } from "wsServices";
import { waitfor } from "../utils";
import { CHANGE_UNIT } from "./workerChangeUnit";

export default async function workerTranning() {
    let lastRun = Date.now()
    while (true) {
        const trainnings = await Trainnings.find({ finishAt: { $lte: Date.now() } })
            .populate('unit userBuilding')

        for (let index = 0; index < trainnings.length; index++) {
            const trainning = trainnings[index];
            const user = await Users.findById(trainning.user)
                .populate('world')
            if (!user) continue

            trainning.total--

            const building = trainning.userBuilding
            const unitData = trainning.unit

            const dereaseTime = building.value / 100
            const unitTrainingTime = unitData.time / user.world.speed
            const time = unitTrainingTime - unitTrainingTime * dereaseTime

            const finishAt = Date.now() + time * 1000
            trainning.finishAt = finishAt
            trainning.time = Date.now() + time * 1000 * trainning.total
            await trainning.save()

            const unit = await Units.findOne({ user: trainning.user, unit: trainning.unit })
            if (!unit) continue

            CHANGE_UNIT.push({
                unit: unit._id,
                newValue: 1
            })
            if (trainning.total === 0) {
                await trainning.delete()
            }
            changeTrainningQueue(trainning.user.toString())
        }
        if(Date.now() - lastRun < 1000) {
            await waitfor(1000 - (Date.now() - lastRun))
        }
        lastRun = Date.now()
    }
}