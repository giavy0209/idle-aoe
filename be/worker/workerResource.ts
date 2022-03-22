import { Resources } from "models";
import { CHANGE_RESOURCE } from "./workerChangeResource";

const secInHour = 3600

export default async function workerResource () {
    const resources = await Resources.find({})
    .limit(100)
    .sort({lastUpdate : 1})
    .populate('building')
    for (let index = 0; index < resources.length; index++) {
        const resource = resources[index];
        const now = Date.now()
        const diffTime = (now - new Date(resource.lastUpdate).getTime()) / 1000
        const percentDiffTimePerHour = diffTime / secInHour
        const generate = resource.building.value
        const valueAfterDiff = generate * percentDiffTimePerHour
        CHANGE_RESOURCE.push({
            resource : resource._id,
            newValue : valueAfterDiff,
            lastUpdate : now
        })
    }
}