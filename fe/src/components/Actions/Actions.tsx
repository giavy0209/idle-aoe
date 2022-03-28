import { FC } from "react";
import { useDispatch } from "react-redux";
import { asyncGetBattlleReport, asyncGetEnemy } from "store/actions";
import {Button} from 'components'
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
            <Button onClick={openModelSendArmy} text="Send Army"/>
            <Button onClick={openModelBattleReport} text="Battle Report"/>
        </div>
        </>
    )
}

export default Actions