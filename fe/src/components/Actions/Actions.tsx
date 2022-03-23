import { FC } from "react";
import { useDispatch } from "react-redux";
import { asyncGetActivity, asyncGetBattlleReport, asyncGetEnemy } from "store/actions";

const Actions : FC = () => {
    const dispatch = useDispatch()
    const openModelSendArmy = () => {
        dispatch(asyncGetEnemy())
    }
    const openModelBattleReport = () => {
        dispatch(asyncGetBattlleReport())
    }
    return (
        <>
        <div className="actions">
            <div onClick={openModelSendArmy} className="action">Send Army</div>
            <div onClick={openModelBattleReport} className="action">Battle Report</div>
        </div>
        </>
    )
}

export default Actions