import Modal from "components/Modal";
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
            {/* {battleDetail && <div className="modal">
                <div className="mask"></div>
                <div className="body">
                </div>
            </div>} */}
            <Modal show={!!battleDetail} onClose={() => dispatch(actionChangeBattleDetail(null))}>
                    {
                        battleDetail ? battleDetail.marching.type === 1 ?
                        <DetailAttack /> 
                        :
                        <DetailSpy />
                        :
                        null
                    }
            </Modal>
        </>
    )
}

export default BattleDetail