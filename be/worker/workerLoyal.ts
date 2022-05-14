import { BuildingDatas, Buildings, Castles } from "../models";
import { changeBuilding } from "wsServices";
import { waitfor } from "../utils";

const secInHour = 3600000

export default async function workerLoyal() {
    let lastRun = Date.now()
    const orderBuilding = await BuildingDatas.findOne({name : 'Order'})
    if(!orderBuilding) return
    while (true) {
        const castles = await Castles.find({loyal : {$lt : 10000}})
        for (let index = 0; index < castles.length; index++) {
            const castle = castles[index];
            const order = await Buildings.findOne({castle : castle._id, building : orderBuilding._id})
            if(!order) continue
            const now = Date.now()
            const diffTime = now - new Date(castle.lastUpdate).getTime()
            const increaseLoyalPerHour = order.level * 100 + 100
            const percentDiffTime = diffTime / secInHour
            const valueIncrease = increaseLoyalPerHour * percentDiffTime
            castle.loyal += valueIncrease
            if(castle.loyal > 10000) {
                castle.loyal = 10000
            }
            castle.lastUpdate = now
            await castle.save()
        }
        if(Date.now() - lastRun < 60000) {
            await waitfor(60000 - (Date.now() - lastRun))
        }
        lastRun = Date.now()
    }
}