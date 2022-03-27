import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleDetail } from "store/actions";
import DetailAttack from "./DetailAttack";
import DetailSpy from "./DetailSpy";
const BattleDetail: FC = () => {
    const dispatch = useDispatch()
    const battleDetail = useSelector((state: any) => state.battleDetail)
    
    return (
        <>
            {battleDetail && <div className="modal">
                <div onClick={() => dispatch(actionChangeBattleDetail(null))} className="mask"></div>
                <div className="body">
                    {
                        battleDetail.marching.type === 1 ?
                        <DetailAttack /> 
                        :
                        <DetailSpy />
                    }
                </div>
            </div>}
        </>
    )
}

export default BattleDetail