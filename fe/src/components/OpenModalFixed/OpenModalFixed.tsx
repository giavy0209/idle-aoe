import { FC } from "react";
import { useDispatch } from "react-redux";
import { actionChangeArmy, actionChangeShowBuilding } from "store/actions/state";

const OpenModalFixed: FC = () => {
    const dispatch = useDispatch()
    return(
        <>
        <div className="open-modal-fixed">
            <div onClick={()=>dispatch(actionChangeShowBuilding(true))} className="title highlight">Buildings</div>
            <div onClick={()=>dispatch(actionChangeArmy(true))} className="title highlight">Army</div>
        </div>
        </>
    )
}

export default OpenModalFixed