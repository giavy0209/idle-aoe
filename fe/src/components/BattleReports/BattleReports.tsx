import renderDate from "helpers/renderDate";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleReport, actionChangeBattleDetail } from "store/actions";
import defeat from 'assets/images/defeat.webp'
import victory from 'assets/images/victory.webp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal";
const BattleReports: FC = () => {
    const [ShowModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const battleReports = useSelector((state: any) => state.battleReports)
    const user = useSelector((state: any) => state.user)

    return (
        <>
            {battleReports && <div className="modal">
                <div onClick={() => dispatch(actionChangeBattleReport(null))} className="mask"></div>
                <div className="body">
                    <div className="battles">
                        <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
                        {
                            battleReports.map(o => <div key={o._id} className="battle">
                                <div className="time">Start At {renderDate({ date: o.marching.arriveTime })}</div>
                                <div className="from-to">
                                    <div className="from">From : {o.attacker.username}</div>
                                    <div className="to">Target : {o.defender.username}</div>
                                </div>
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
                                <div onClick={() => dispatch(actionChangeBattleDetail(o))} className="detail">Battle Detail</div>
                            </div>)
                        }
                    </div>
                </div>
            </div>}
            <Modal onClose={()=> setShowModal(false)} show={ShowModal}>
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
                        <p>If there is no unit in their range, they will find closest enemy's unit's range</p>
                        <p>If your unit's strength larger than enemy's unit's life, they will find next target and attack until there is no Unit they can attack in their turn</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default BattleReports