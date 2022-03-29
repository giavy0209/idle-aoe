import { FC } from "react";
import { useDispatch } from "react-redux";
import { asyncGetBattlleReport, asyncGetClan, asyncGetEnemy } from "store/actions";
import {Button} from 'components'
const Actions : FC = () => {
    const dispatch = useDispatch()
    const openModelSendArmy = () => {
        dispatch(asyncGetEnemy())
    }
    const openModelBattleReport = () => {
        dispatch(asyncGetBattlleReport())
    }
    const openModalClan = () => {
        dispatch(asyncGetClan())
    }
    return (
        <>
        <div className="actions">
            <Button onClick={openModelSendArmy} text="Send Army"/>
            <Button onClick={openModelBattleReport} text="Battle Report"/>
            <Button onClick={openModalClan} text="Clan"/>
        </div>
        </>
    )
}

export default Actions