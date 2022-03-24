import renderDate from "helpers/renderDate";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleReport , actionChangeBattleDetail } from "store/actions";
import defeat from 'assets/images/defeat.webp'
import victory from 'assets/images/victory.webp'
const BattleReports: FC = () => {
    const dispatch = useDispatch()
    const battleReports = useSelector((state: any) => state.battleReports)
    const user = useSelector((state: any) => state.user)
    
    return (
        <>
            {battleReports && <div className="modal">
                <div onClick={() => dispatch(actionChangeBattleReport(null))} className="mask"></div>
                <div className="body">
                    <div className="battles">
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
        </>
    )
}
export default BattleReports