import { BuildingDatas, Buildings, Castles, Resources, UnitDatas, Units, Users } from "models";
import { Types } from "mongoose";

interface ICreate {
    user: string | Types.ObjectId,
    isGhost?: boolean,
    isCapital?: boolean,
    name?: string
}
 const services = {
    create : async ({ user, isGhost = false, isCapital = false, name = 'Capital' }: ICreate) => {
        const findUser = await Users.findById(user)
        if(!findUser) return null
        const castle = await Castles.create({
            user,
            isGhost,
            isCapital,
            name,
            clan: findUser.clan,
            world: findUser.world,
        })
        const listBuildings = await BuildingDatas.find({})
        for (let index = 0; index < listBuildings.length; index++) {
            const listBuilding = listBuildings[index];
            const building = await Buildings.create({
                castle: castle._id,
                user: findUser._id,
                building: listBuilding._id,
                value: listBuilding.upgrade[0].generate,
                resource: listBuilding.resource,
            })
            if (listBuilding.resource) {
                await Resources.create({
                    user: findUser._id,
                    type: listBuilding.resource,
                    building: building._id,
                    castle: castle._id,
                })
            }
        }
        const units = await UnitDatas.find({})
        for (let index = 0; index < units.length; index++) {
            const unit = units[index];
            await Units.create({
                user: findUser._id,
                unit: unit._id,
                castle: castle._id,
            })
        }
        return castle
    }
}

export default services