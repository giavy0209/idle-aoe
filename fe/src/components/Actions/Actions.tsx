import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button} from 'components'
import { asyncGetBattlleReport, asyncGetEnemy } from "store/actions/battle";
import { asyncGetClan, asyncGetClanDetail } from "store/actions/clan";
const Actions : FC = () => {
    const dispatch = useDispatch()
    const user = useSelector((state : any) => state.user)
    const openModelSendArmy = () => {
        dispatch(asyncGetEnemy())
    }
    const openModelBattleReport = () => {
        dispatch(asyncGetBattlleReport())
    }
    const openModalClan = () => {
        if(user?.clan) {
            dispatch(asyncGetClanDetail(user.clan._id))
        }else {
            dispatch(asyncGetClan())
        }
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