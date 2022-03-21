import { FC } from "react";
import { useDispatch } from "react-redux";
import { asyncGetEnemy } from "store/actions";

const Actions : FC = () => {
    const dispatch = useDispatch()
    const openModelSendArmy = () => {
        dispatch(asyncGetEnemy())
    }
    return (
        <>
        <div className="actions">
            <div onClick={openModelSendArmy} className="action">Send Army</div>
        </div>
        </>
    )
}

export default Actions