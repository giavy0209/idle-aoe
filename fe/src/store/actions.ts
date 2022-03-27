import callAPI from "callAPI"
import storage from "helpers/storage"
import { toast } from "react-toastify"

export const CHANGE_LOADING = 'CHANGE_LOADING'

export const actionChangeLoading = function (isLoading) {
    return {
        type : CHANGE_LOADING,
        payload : {isLoading}
    }
}

export const CHANGE_BATTLE_DETAIL = 'CHANGE_BATTLE_DETAIL'

export const actionChangeBattleDetail = function (battleDetail) {
    return {
        type : CHANGE_BATTLE_DETAIL,
        payload : {battleDetail}
    }
}

export const CHANGE_MODAL_ACTIVITY = 'CHANGE_MODAL_ACTIVITY'

export const actionChangeModalActivity = function (modalActivity) {
    return {
        type : CHANGE_MODAL_ACTIVITY,
        payload : {modalActivity}
    }
}

export const CHANGE_SHOW_ATTACK = 'CHANGE_SHOW_ATTACK'

export const actionChangeShowAttack = function (showAttack) {
    return {
        type : CHANGE_SHOW_ATTACK,
        payload : {showAttack}
    }
}

export const CHANGE_USER = 'CHANGE_USER'

export const actionChangeUser = function (user) {
    return {
        type : CHANGE_USER,
        payload : {user}
    }
}

export const asyncGetUser = () => async dispatch => {
    const res = await callAPI.get('/user')
    dispatch(actionChangeUser(res.data))
}

export const CHANGE_RESOURCES = 'CHANGE_RESOURCES'

export const actionChangeResources = function(resources) {
    return {
        type : CHANGE_RESOURCES,
        payload : {resources}
    }
}

export const asyncGetResources = () => async dispatch => {
    const res = await callAPI.get('/resources')
    dispatch(actionChangeResources(res.data))
}

export const CHANGE_BUILDING = 'CHANGE_BUILDING'

export const actionChangeBuildings = function(buildings) {
    return {
        type : CHANGE_BUILDING,
        payload : {buildings}
    }
}

export const asyncGetBuildings = () => async dispatch => {
    const res = await callAPI.get('/buildings')
    dispatch(actionChangeBuildings(res.data))
}

export const CHANGE_UNIT = 'CHANGE_UNIT'

export const actionChangeUnits = function(units) {
    return {
        type : CHANGE_UNIT,
        payload : {units}
    }
}

export const asyncGetUnits = () => async dispatch => {
    const res = await callAPI.get('/units')
    dispatch(actionChangeUnits(res.data))
}



export const CHANGE_UPGRADE = 'CHANGE_UPGRADE'

export const actionChangeUpgrade = function(upgrade) {
    return {
        type : CHANGE_UPGRADE,
        payload : {upgrade}
    }
}

export const asyncGetUpgrade = (building) => async dispatch => {
    const {data, status} = await callAPI.get(`/upgrade?building=${building}`)
    if(status === 101) toast('Your building is max level')
    dispatch(actionChangeUpgrade(data))
    
}

export const CHANGE_TRAINNING = 'CHANGE_TRAINNING'

export const actionChangeTranning = function(tranning) {
    return {
        type : CHANGE_TRAINNING,
        payload : {tranning}
    }
}
export const asyncGetTranning = (unit) => async dispatch => {
    const {data} = await callAPI.get(`/trainning?unit=${unit}`)
    dispatch(actionChangeTranning(data))
}

export const CHANGE_TRAINNING_QUEUE = 'CHANGE_TRAINNING_QUEUE'

export const actionChangeTranningQueue = function(trainningQueue) {
    return {
        type : CHANGE_TRAINNING_QUEUE,
        payload : {trainningQueue}
    }
}

export const asyncGetTranningQueue = () => async dispatch => {
    const {data} = await callAPI.get(`/trainning-queue`)
    dispatch(actionChangeTranningQueue(data))
}

export const CHANGE_ENEMY = 'CHANGE_ENEMY'

export const actionChangeEnemy = function(enemy) {
    return {
        type : CHANGE_ENEMY,
        payload : {enemy}
    }
}

export const asyncGetEnemy = () => async dispatch => {
    const {data} = await callAPI.get(`/enemy`)
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

export const asyncGetBattlleReport = () => async dispatch => {
    const {data} = await callAPI.get(`/battle`)
    
    dispatch(actionChangeBattleReport(data))
}

export const asyncInit = () => async dispatch => {
    const {status} = await callAPI.get('/valid-jwt')
    if(status === 1) {
        dispatch(asyncGetUser())
        dispatch(asyncGetResources())
        dispatch(asyncGetBuildings())
        dispatch(asyncGetUnits())
        dispatch(asyncGetTranningQueue())
        dispatch(asyncGetActivity())
    }
    if(status === 0) {
        storage.clearToken()
    }
}