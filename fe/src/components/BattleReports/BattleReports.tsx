import renderDate from "helpers/renderDate";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Pagination } from "components";
import defeat from 'assets/images/defeat.webp'
import victory from 'assets/images/victory.webp'
import { actionChangeBattleDetail, actionChangeBattleReport, actionChangeBattleSimulation, asyncGetBattlleReport } from "store/actions/battle";
const BattleReports: FC = () => {
    const [ShowModal, setShowModal] = useState(false)
    const [CurrentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const battleReports = useSelector((state: any) => state.battleReports?.data)
    const totalBattleReports = useSelector((state: any) => state.battleReports?.total)
    const user = useSelector((state: any) => state.user)

    const onChangePage = page => {
        dispatch(asyncGetBattlleReport(page))
        setCurrentPage(page)
    }
    return (
        <>
            <Modal onClose={() => dispatch(actionChangeBattleReport(null))} show={battleReports}>
                <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
                    <div className="battles-report">
                        {
                            battleReports?.map(o => <div key={o._id} className="battle-report">
                                <div className="time">Start At {renderDate({ date: o.marching.arriveTime })}</div>
                                <div className="from-to">
                                    <div className="from">From : {o.attacker.username}({o.attackerCastle.name})</div>
                                    <div className="to">Target : {o.defender.username}({o.defenderCastle.name})</div>
                                </div>
                                <div className="type">{
                                    o.marching.type === 1 ? 
                                    'Attack' : 
                                    o.marching.type === 2 ? 'Spy' : 
                                    ''
                                }</div>
                                <div className="result">Result
                                    {
                                        o.marching.user === user._id ?
                                            (
                                                o.marching.status === 1 || o.marching.status === 2 ?
                                                    <img src={victory} alt="" />
                                                    :
                                                    <img src={defeat} alt="" />
                                            )
                                            :
                                            (
                                                o.marching.status === 1 || o.marching.status === 2 ?
                                                    <img src={defeat} alt="" />
                                                    :
                                                    <img src={victory} alt="" />
                                            )
                                    }
                                </div>
                                <Button onClick={() => dispatch(actionChangeBattleDetail(o))} text="Battle Detail" />
                                {o.marching.type === 1 ? <Button onClick={() => dispatch(actionChangeBattleSimulation(o))} text="Battle Simulation" /> : null}
                            </div>)
                        }

                    <Pagination current={CurrentPage} onChange={onChangePage} total={totalBattleReports} />
                </div>
            </Modal>
            <Modal onClose={() => setShowModal(false)} show={ShowModal}>
                <div className="question">
                    <div className="title">Attack</div>
                    <div className="content">
                        <p>Army attack with the following order</p>
                        <p>-Siege</p>
                        <p>-Archers</p>
                        <p>-Cavalry</p>
                        <p>-Infantry</p>
                        <p>If your Siege kill all enemy's Infantry, enemy's Infantry do nothing in their turn</p>
                        <p>If your Siege kill all enemy's Siege, enemy's Siege still can attack your army, they will dead in next round</p>
                        <p>Each unit have their own range. They will randomly find any enemy's unit in their range and attack</p>
                        <p>If both have same army, which one choose right target they will win.</p>
                        <p>Example if both have 100 Shortbow and 50 Swordsman, Shortbow can hit enemy's Shortbow and Swordsman</p>
                        <p>If your Shortbow choose to hit enemy's Swordsman, enemy's Swordsman will be killed in first round and can't attack your army </p>
                        <p>If enemy's Shortbow choose to hit your Shortbow, they just kill 25 your Shortbow, after end Archers turn, you have 50 Swordsman and 75 Shortbow, your enemy have 0 Swordsman and 100 Shortbow</p>
                        <p>Then in Infantry turn, your Swordsman can kill 43 enemy's Shortbow</p>
                        <p>Result : you win because your Shortbow choose right target</p>
                        <p>If there is no unit in their range, they will find closest enemy's unit's range</p>
                        <p>If your unit's strength larger than enemy's unit's life, they will find next target and attack until there is no Unit they can attack in their turn</p>
                        <p>While unit attack enemy, they have 5% to instally kill.</p>
                        <p>Example 1 Pikeman attack 1 Pikeman, Pikeman have 40 life and 220 attack against infantry, when round end, your Pikeman have 20 life, enemy's Pikeman have 20life</p>
                        <p>-They have 95% to heal full life</p>
                        <p>-5% to instally get killed</p>
                        <p>While unit attack enemy, their strength randomly from -5% to 5%</p>
                        <p>If both have nearly same army, winner is luckier</p>
                    </div>
                    <div className="title">Spy</div>
                    <div className="content">
                        <p>If your Quickwalker more than enemy's Quickwalker, you can collect enemy's information</p>
                        <p>If your Quickwalker less than enemy's Quickwalker, you fail to collect enemy's information</p>
                        <p>You and enemy will lost some Quickwalker if enemy also have Quickwalker</p>
                        <p>You will collect the following information</p>
                        <p>-Building Level</p>
                        <p>-Amount of resources</p>
                        <p>-Army</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default BattleReports