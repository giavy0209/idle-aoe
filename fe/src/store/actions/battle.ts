import callAPI from "callAPI"
import { actionChangeLoading } from "./state"

export const CHANGE_BATTLE_DETAIL = 'CHANGE_BATTLE_DETAIL'

export const actionChangeBattleDetail = function (battleDetail) {
    return {
        type : CHANGE_BATTLE_DETAIL,
        payload : {battleDetail}
    }
}

export const CHANGE_SHOW_ATTACK = 'CHANGE_SHOW_ATTACK'

export const actionChangeShowAttack = function (showAttack) {
    return {
        type : CHANGE_SHOW_ATTACK,
        payload : {showAttack}
    }
}

export const CHANGE_ENEMY = 'CHANGE_ENEMY'

export const actionChangeEnemy = function(enemy) {
    return {
        type : CHANGE_ENEMY,
        payload : {enemy}
    }
}

export const asyncGetEnemy = (search ? : string) => async dispatch => {
    const {data} = await callAPI.get(`/enemy?search=${search ? search : ''}`)
    dispatch(actionChangeEnemy(data))
}

export const CHANGE_ACTIVITY = 'CHANGE_ACTIVITY'

export const actionChangeActivity = function(activity) {
    return {
        type : CHANGE_ACTIVITY,
        payload : {activity}
    }
}

export const asyncGetActivity = () => async dispatch => {
    const {data} = await callAPI.get(`/marching`)
    dispatch(actionChangeActivity(data))
}

export const CHANGE_BATTLE_REPORT = 'CHANGE_BATTLE_REPORT'

export const actionChangeBattleReport = function(battleReports) {
    return {
        type : CHANGE_BATTLE_REPORT,
        payload : {battleReports}
    }
}

export const asyncGetBattlleReport = (page?: number|string) => async dispatch => {
    dispatch(actionChangeLoading(true))
    const {data,total} = await callAPI.get(`/battle?page=${page}`)
    dispatch(actionChangeLoading(false))
    dispatch(actionChangeBattleReport({data,total}))
}