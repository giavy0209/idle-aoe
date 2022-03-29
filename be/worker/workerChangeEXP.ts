import {  Users } from "models";
import { Types } from "mongoose";
import { changeResources, changeUser } from "wsServices";
import { waitfor } from "../utils";

interface IChangeResource {
    user: Types.ObjectId | string,
    newValue: number,
}

export const CHANGE_EXP: IChangeResource[] = []

async function workerChangeResource() {
    while (true) {
        const data = CHANGE_EXP[0]
        if (!data) {
            await waitfor(1000)
            continue
        }
        const { user, newValue } = data;
        const findUser = await Users.findById(user)
        if (!findUser) continue
        findUser.exp += newValue
        await findUser.save()
        changeUser(findUser._id.toString())
        CHANGE_EXP.splice(0, 1)
    }


}

export default workerChangeResource 