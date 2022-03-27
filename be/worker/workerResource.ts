import { Resources } from "models";
import { waitfor } from "../utils";
import { CHANGE_RESOURCE } from "./workerChangeResource";

const secInHour = 3600

export default async function workerResource () {
    let lastRun = Date.now()
    while (true) {
        const resources = await Resources.find({})
        .limit(100)
        .sort({lastUpdate : 1})
        .populate('building')
        .populate({
            path : 'user',
            populate : {
                path : 'world'
            }
        })
        for (let index = 0; index < resources.length; index++) {
            const resource = resources[index];
            const now = Date.now()
            const diffTime = (now - new Date(resource.lastUpdate).getTime()) / 1000
            const percentDiffTimePerHour = diffTime / secInHour
            const generate = resource.building.value * resource.user.world.speed
            const valueAfterDiff = generate * percentDiffTimePerHour
            CHANGE_RESOURCE.push({
                resource : resource._id,
                newValue : valueAfterDiff,
                lastUpdate : now
            })
        }
        if(Date.now() - lastRun < 5000) {
            await waitfor(5000 - (Date.now() - lastRun))
        }
        lastRun = Date.now()
    }
}