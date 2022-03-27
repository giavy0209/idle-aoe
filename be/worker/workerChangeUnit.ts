import { Units } from "models";
import { Types } from "mongoose";
import { changeUnit } from "wsServices";
import { waitfor } from "../utils";

interface IChangeUnit {
    unit: Types.ObjectId | string,
    newValue: number,
}
export const CHANGE_UNIT: IChangeUnit[] = []

export default async function workerChangeUnit() {
    while (true) {
        const data = CHANGE_UNIT[0]
        if (!data) {
            await waitfor(1000)
            continue
        }
        const { unit, newValue } = data;
        const findUnit = await Units.findById(unit)
        if (!findUnit) continue
        findUnit.total += newValue
        await findUnit.save()
        CHANGE_UNIT.splice(0, 1)
        changeUnit(findUnit.user.toString())
    }

}