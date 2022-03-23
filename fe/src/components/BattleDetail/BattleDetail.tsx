import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleDetail } from "store/actions";

const BattleDetail : FC = () => {
    const dispatch = useDispatch()
    const battleDetail = useSelector((state : any) => state.battleDetail)
    console.log(battleDetail);
    
    return (
        <>
        {battleDetail && <div className="modal">
            <div onClick={()=>dispatch(actionChangeBattleDetail(null))} className="mask"></div>
            <div className="body">
                <div className="battle-detail">
                    
                </div>
            </div>
        </div>}
        </>
    )
}

export default BattleDetail