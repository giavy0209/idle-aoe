import { Marchings, Units, Users } from "models";
import { waitfor } from "../utils";

export default async function workerResource () {
    let lastRun = Date.now()
    while (true) {
        const users = await Users.find({})
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            const units = await Units.find({user : user._id})
            .populate('unit')

            const marchings = await Marchings.find({user : user._id , status : {$in : [0, 1]}})
            .populate('units.unit')
            let totalPopulation = 0
            units.forEach(({unit , total, inTower}) => {
                totalPopulation += unit.population * total
                totalPopulation += unit.population * inTower
            });

            marchings.forEach(marching => {
                marching.units.forEach(({unit , total}) => {
                    totalPopulation += unit.population * total
                })
            })

            user.population = totalPopulation
            await user.save()
        }
        if(Date.now() - lastRun < 60000) {
            await waitfor(60000 - (Date.now() - lastRun))
        }
        lastRun = Date.now()
    }
}