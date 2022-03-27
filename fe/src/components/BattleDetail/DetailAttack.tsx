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
const DetailAttack: FC = () => {
    const battleDetail = useSelector((state: any) => state.battleDetail)
    return (
        <>
            <div className="battle-detail">
                <div className="start">
                    <div className="title">Battle Started</div>
                    <div className="players">
                        <div className="player">
                            <p>{battleDetail.attacker.username} join battle with</p>
                            <div className="player-units">
                                {
                                    battleDetail.attackerUnits.map(o => <div key={o._id} className="unit">
                                        <span>{o.total}</span>
                                        <span>{o.unit.name}</span>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className="player">
                            <p>{battleDetail.defender.username} join battle with</p>
                            <div className="player-units">
                                {
                                    battleDetail.defenderUnits.map(o => <div key={o._id} className="unit">
                                        <span>{o.total}</span>
                                        <span>{o.unit.name}</span>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="rounds">
                        {
                            battleDetail.rounds.map(o => <div key={o._id} className="round">
                                <div className="title">{o.name}</div>
                                <div className="round-actions">
                                    {
                                        o.actions.map(action => <div key={action._id} className="action">
                                            <p>
                                                <span className="total-hit">{action.unitAttack.total} </span>
                                                <span className="attacker-unit">{action.unitAttack.unit.name} </span>
                                                <span className="strength"> ({action.unitAttack.damage} strength) </span>
                                                from
                                                <span className="attacker-name"> {action.unitAttack.user.username} </span>
                                                kill
                                                <span className="total-hit"> {action.unitDefend.totalHit} </span>
                                                <span className="defender-unit"> {action.unitDefend.unit.name} </span>
                                                from
                                                <span className="defender-name"> {action.unitDefend.user.username} </span>
                                            </p>
                                        </div>)
                                    }
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className="end">
                    <div className="title">Battle End</div>
                    <p>{battleDetail.winner.username} win the battle</p>
                </div>
                <div className="stolen">
                    <div className="title">Resource stolen</div>
                    {
                        resources.map(o => <div key={o.name} className="res">
                            <div className="img">
                                <img src={o.img} alt="" />
                            </div>
                            <div className="value">
                                {Math.floor(battleDetail.marching.cargo[o.name])}
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default DetailAttack