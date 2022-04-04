import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button} from 'components'
import { asyncGetBattlleReport, asyncGetEnemy } from "store/actions/battle";
import { asyncGetClan, asyncGetClanDetail } from "store/actions/clan";
import { actionChangeShowMarket, actionChangeShowTower } from "store/actions/state";
import { asyncGetCastles } from "store/actions/user";
const Actions : FC = () => {
    const dispatch = useDispatch()
    const user = useSelector((state : any) => state.user)
    const openModalSendArmy = () => {
        dispatch(asyncGetEnemy())
    }

    const openModalCastles = () => {
        dispatch(asyncGetCastles())
    }

    const openModalBattleReport = () => {
        dispatch(asyncGetBattlleReport())
    }

    const openModalClan = () => {
        if(user?.clan) {
            dispatch(asyncGetClanDetail(user.clan._id))
        }else {
            dispatch(asyncGetClan())
        }
    }
    const openModalMarket = () => {
        dispatch(actionChangeShowMarket(true))
    }

    const openModalTower = () => {
        dispatch(actionChangeShowTower(true))
    }
    return (
        <>
        <div className="actions">
            <Button onClick={openModalCastles} text="Castles"/>
            <Button onClick={openModalSendArmy} text="Send Army"/>
            <Button onClick={openModalBattleReport} text="Battle Report"/>
            <Button onClick={openModalClan} text="Clan"/>
            <Button onClick={openModalMarket} text="Market"/>
            <Button onClick={openModalTower} text="Tower"/>

        </div>
        </>
    )
}

export default Actions