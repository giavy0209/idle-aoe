import { FC } from "react";
import { useSelector } from "react-redux";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
const resources: {
    name: string,
    img: any,
}[] = [
        {
            name: 'gold',
            img: goldore,
        },
        {
            name: 'iron',
            img: ironore,
        },
        {
            name: 'wood',
            img: wood
        },
        {
            name: 'food',
            img: food
        }
    ]
const DetailSpy: FC = () => {
    const battleDetail = useSelector((state: any) => state.battleDetail)
    const user = useSelector((state: any) => state.user)
    return (
        <>
            <div className="battle-detail">
                <div className="start">
                    <div className="title">Spy Started</div>
                    <div className="players">
                        <p><span className="attacker">{battleDetail.attacker.username}</span> send <span className="total">{battleDetail.spy.quickWalkerLost + battleDetail.marching.units[0].total}</span> Quickwalker to <span className="defender">{battleDetail.defender.username}</span></p>
                    </div>
                </div>
                <div className="end">
                    {
                        user._id === battleDetail.winner._id ?
                            <div className="information">
                                All Quickwalker from {battleDetail.defender.username} are defeat by Quickwalker of {battleDetail.attacker.username}
                                <span>Quickwalker from {battleDetail.attacker.username} collected information</span>
                                <div className="resrouces">
                                    <div className="title">Resource</div>
                                    {
                                        resources.map(o => <div key={o.name} className="res">
                                            <div className="img">
                                                <img src={o.img} alt="" />
                                            </div>
                                            <div className="value">
                                                {Math.floor(battleDetail.spy.resources[o.name])}
                                            </div>
                                        </div>)
                                    }
                                </div>
                                <div className="spy-units">
                                    <div className="title">Units</div>
                                    {
                                        battleDetail.spy.units.map(o => <div className="unit">
                                            <span>{o.total}</span>
                                            <span>{o.unit.name}</span>
                                        </div>)
                                    }
                                </div>
                                <div className="spy-building">
                                    <div className="title">Buildings</div>
                                    {
                                        battleDetail.spy.buildings.map(o => <div className="building">
                                            <span>{o.level}</span>
                                            <span>{o.building.name}</span>
                                        </div>)
                                    }
                                </div>
                            </div>
                            :
                            <div className="lose">
                                All Quickwalker from {battleDetail.attacker.username} are defeated by Quickwalker of {battleDetail.defender.username}
                                <span>No information collected</span>
                            </div>
                    }
                </div>
                <div className="lost">
                    <span>{battleDetail.attacker.username} lost {battleDetail.spy.quickWalkerLost} Quickwalker</span>
                    <span>{battleDetail.defender.username} lost {battleDetail.spy.quickWalkerLost} Quickwalker</span>
                </div>
            </div>
        </>
    )
}

export default DetailSpy