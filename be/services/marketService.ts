import { Buildings, Marchings, Markets } from "models"
import { Types } from "mongoose"

interface ICalcTotalCargo {
    user : string | Types.ObjectId,
    castle : string | Types.ObjectId,
}

const services = {
    calcTotalCargo : async ({user, castle} : ICalcTotalCargo) => {
        const marketBuilding = (await Buildings.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(user),
                    castle : new Types.ObjectId(castle)
                }
            },
            {
                $lookup: {
                    from: 'building_datas',
                    localField: 'building',
                    foreignField: '_id',
                    as: 'building'
                }
            },
            {
                $unwind: {
                    path: '$building'
                }
            },
            {
                $match: {
                    "building.name": 'Market'
                }
            }
        ]))[0]

        if (!marketBuilding) return 0
        const marchings = await Marchings.find({ user, fromCastle : castle, type: { $in: [3, 4] }, status: { $ne: 2 } })

        let marketCargo = marketBuilding.value
        marchings.forEach(marching => {
            for (const key in marching.cargo) {
                if (Object.prototype.hasOwnProperty.call(marching.cargo, key)) {
                    const value = marching.cargo[key];
                    marketCargo -= value
                }
            }
        })
        const markets = await Markets.find({ user, castle : castle, status: { $ne: 2 } })
        markets.forEach(market => {
            for (const key in market.offer) {
                if (Object.prototype.hasOwnProperty.call(market.offer, key)) {
                    const value = market.offer[key];
                    marketCargo -= value
                }
            }
        })

        return marketCargo
    }
}

export default services