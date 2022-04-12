import { faChevronCircleLeft, faChevronCircleRight, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "components/Modal";
import { _units } from "constant";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleSimulation } from "store/actions/battle";

const Formulation: FC<{ units: any }> = ({ units }) => {
    return (
        <>
            <div className="row-1">
                {units?.map(o => {
                    if (o.unit.range === 1) {
                        return <div className="unit">
                            <div className="img">
                                <img src={o.img} alt="" />
                            </div>
                            <div className="info">
                                <div className="curren">{o.total}</div>
                            </div>
                        </div>
                    }
                    return null
                })}
            </div>
        </>
    )
}

const BattleSimulation: FC = () => {
    const dispatch = useDispatch()
    const battleSimulation = useSelector((state: any) => state.battleSimulation)
    console.log(battleSimulation);

    const [IsAutoPlay, setIsAutoPlay] = useState(false)
    const [IndexRound, setIndexRound] = useState(1)
    const [IndexTurn, setIndexTurn] = useState(0)

    const { TotalRound, attackerUnits, defenderUnits } = useMemo(() => {
        if (!battleSimulation) return {}
        return {
            TotalRound: battleSimulation.rounds.length,
            attackerUnits: battleSimulation.attackerUnits.sort((a, b) => a.unit.range - b.unit.range).map(o => {
                return { ...o, img: _units.find(_o => _o.name === o.unit.name)?.img }
            }),
            defenderUnits: battleSimulation.defenderUnits.sort((a, b) => a.unit.range - b.unit.range).map(o => {
                return { ...o, img: _units.find(_o => _o.name === o.unit.name)?.img }
            }),
        }
    }, [battleSimulation])

    const currentRound = useMemo(() => {
        return battleSimulation?.rounds[IndexRound - 1]
    }, [IndexRound, battleSimulation])

    const currentTurn = useMemo(() => {
        console.log(currentRound);
        
        const turn = currentRound?.actions[IndexTurn]
        if (!turn) return {}
        const findDataAttack = _units.find(_o => _o.name === turn.unitAttack.unit.name)
        const findDataDefend = _units.find(_o => _o.name === turn.unitDefend.unit.name)

        turn.unitAttack = { ...turn.unitAttack, img: findDataAttack?.img,}
        turn.unitDefend = { ...turn.unitDefend, img: findDataDefend?.img,}
        return turn
    }, [IndexRound, currentRound, defenderUnits])
    console.log(currentTurn);
    

    return (
        <>
            <Modal show={!!battleSimulation} onClose={() => dispatch(actionChangeBattleSimulation(null))} >
                {battleSimulation && <div className="battle-simulation">
                    <div className="button-actions">
                        <div className="block">
                            <div className="action">Round <div className="icon"><FontAwesomeIcon icon={faChevronCircleLeft} /></div> </div>
                            <div className="action">Turn <div className="icon"><FontAwesomeIcon icon={faChevronCircleLeft} /></div> </div>
                        </div>
                        <div className="block">
                            <div onClick={() => setIsAutoPlay(!IsAutoPlay)} className="action">Auto Turn <div className="icon"><FontAwesomeIcon icon={IsAutoPlay ? faPause : faPlay} /></div></div>
                        </div>
                        <div className="block">

                            <div className="action">Turn <div className="icon"><FontAwesomeIcon icon={faChevronCircleRight} /></div> </div>
                            <div className="action">Round <div className="icon"><FontAwesomeIcon icon={faChevronCircleRight} /> </div> </div>
                        </div>
                    </div>
                    <div className="player">
                        <div className="name">{battleSimulation.attacker.username} ({battleSimulation.attackerCastle.name})</div>
                        <div className="formulation">
                            {
                                currentTurn?.unitAttack?.user._id === battleSimulation.attacker._id ?
                                    <div className="row">
                                        <img src={currentTurn?.unitAttack.img} alt="" />
                                    </div>
                                    :
                                    <div className="row">
                                        <img src={currentTurn?.unitDefend.img} alt="" />
                                    </div>
                            }
                        </div>

                    </div>
                    <div className="round">Round {IndexRound}/{TotalRound}</div>
                    <div className="player">
                        <div className="name">{battleSimulation.defender.username} ({battleSimulation.defenderCastle.name})</div>
                        <div className="formulation">

                        </div>

                    </div>
                </div>}
            </Modal>
        </>
    )
}

export default BattleSimulation