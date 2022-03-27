import { Resources } from "models";
import { Types } from "mongoose";
import { changeResources } from "wsServices";
import { waitfor } from "../utils";

interface IChangeResource {
    resource: Types.ObjectId | string,
    newValue: number,
    lastUpdate?: number | Date,
}

export const CHANGE_RESOURCE: IChangeResource[] = []

async function workerChangeResource() {
    while (true) {
        const data = CHANGE_RESOURCE[0]
        if (!data) {
            await waitfor(1000)
            continue
        }
        const { resource, newValue, lastUpdate } = data;
        const findResource = await Resources.findById(resource)
        if (!findResource) continue
        findResource.value += newValue
        if (lastUpdate) {
            findResource.lastUpdate = lastUpdate
        }
        await findResource.save()
        changeResources(findResource.user.toString())
        CHANGE_RESOURCE.splice(0, 1)

    }


}

export default workerChangeResource 