import ModalFixed from "components/ModalFixed";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeArmy, actionChangeUnitType } from "store/actions/state";

const Army: FC = () => {
    const dispatch = useDispatch()
    const show = useSelector((state: any) => state.isArmy)
    return (
        <>
            <ModalFixed onClose={() => dispatch(actionChangeArmy(false))} show={show}>
                <div className="army">
                    <div onClick={()=>dispatch(actionChangeUnitType('infantry'))} className="title highlight">Infantry Unit</div>
                    <div onClick={()=>dispatch(actionChangeUnitType('cavalry'))} className="title highlight">Cavalry Unit</div>
                    <div onClick={()=>dispatch(actionChangeUnitType('archer'))} className="title highlight">Archers Unit</div>
                <div onClick={()=>dispatch(actionChangeUnitType('siege'))} className="title highlight">Siege Unit</div>
                </div>
            </ModalFixed>
        </>
    )
}

export default Army