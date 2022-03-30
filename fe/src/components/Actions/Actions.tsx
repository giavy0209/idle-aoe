import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetBattlleReport, asyncGetClan, asyncGetClanDetail, asyncGetEnemy } from "store/actions";
import {Button} from 'components'
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