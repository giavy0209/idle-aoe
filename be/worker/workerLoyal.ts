import { BuildingDatas, Buildings, Castles } from "../models";
import { changeBuilding } from "wsServices";
import { waitfor } from "../utils";

export default async function workerLoyal() {
    let lastRun = Date.now()
    const orderBuilding = await BuildingDatas.findOne({name : 'Order'})
    if(!orderBuilding) return
    // while (true) {
    //     const castles = await Castles.find({loyal : {$lt : 10000}})
    //     for (let index = 0; index < castles.length; index++) {
    //         const castle = castles[index];
    //         const order = await Buildings.findOne({castle : castle._id, building : orderBuilding._id})

    //     }
    
        
    //     lastRun = Date.now()
        
    // }
}