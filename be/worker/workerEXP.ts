import { Users, Worlds } from "models"
import { Types } from "mongoose"
import { waitfor } from "../utils"

const findTop10 = async (world_id: Types.ObjectId | string, skip: number) : Promise<number>  => {
    try {
        const top10 = await Users.findOne({ world: world_id }).sort({ exp: -1 }).skip(skip)
        if (!top10) {
            if (skip - 1 < 0) {
                return 0
            }
            return await findTop10(world_id, skip - 1)
        }
        return top10.exp
    }catch{
        return 0
    }
}

export default async function workerEXP() {
    let lastRun = Date.now()
    while (true) {
        const worlds = await Worlds.find({})
        for (let index = 0; index < worlds.length; index++) {
            const world = worlds[index];
            const top10EXP = await findTop10(world._id, 9)
            world.averageEXP = top10EXP
            await world.save()
        }
        if (Date.now() - lastRun < 600000) {
            await waitfor(600000 - (Date.now() - lastRun))
        }
        lastRun = Date.now()
    }
}