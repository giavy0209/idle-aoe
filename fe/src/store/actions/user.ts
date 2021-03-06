import callAPI from "callAPI"
import { asyncChangeCastle } from "./init"

export const CHANGE_USER = 'CHANGE_USER'

export const actionChangeUser = function (user) {
    return {
        type : CHANGE_USER,
        payload : {user}
    }
}

export const CHANGE_WORLD_BONUS = 'CHANGE_WORLD_BONUS'

export const actionChangeWorldBonus = function (worldBonus) {
    return {
        type : CHANGE_WORLD_BONUS,
        payload : {worldBonus}
    }
}

export const asyncGetUser = () => async dispatch => {
    const res = await callAPI.get('/user')
    let baseBonus = 5
    let bonus = 1
    const worldEXP = res.data?.world?.averageEXP || 0
    const userEXP = res.data?.exp || 0
    if(worldEXP && userEXP && userEXP < worldEXP) {
        bonus = (worldEXP - userEXP) / worldEXP * baseBonus
    }
    dispatch(actionChangeWorldBonus(bonus))
    dispatch(actionChangeUser(res.data))
}

export const CHANGE_CURRENT_CASTLES = 'CHANGE_CURRENT_CASTLES'

export const actionChangeCurrentCastle = function (currentCastle) {
    
    return {
        type : CHANGE_CURRENT_CASTLES,
        payload : {currentCastle}
    }
}

export const asyncGetCurrentCastle = () => async dispatch => {
    const res = await callAPI.get('/castle')
    dispatch(asyncChangeCastle(res.data._id))
    dispatch(actionChangeCurrentCastle(res.data))
}

export const CHANGE_CASTLES = 'CHANGE_CASTLES'

export const actionChangeCastles = function (castles) {
    return {
        type : CHANGE_CASTLES,
        payload : {castles}
    }
}

export const asyncGetCastles = () => async dispatch => {
    const res = await callAPI.get('/castles')
    dispatch(actionChangeCastles(res.data))
}

export const CHANGE_GHOST_CASTLE = 'CHANGE_GHOST_CASTLE'

export const actionChangeGhostCastle = function (ghostCastle) {
    return {
        type : CHANGE_GHOST_CASTLE,
        payload : {ghostCastle}
    }
}

export const asyncGetGhostCastle = () => async dispatch => {
    const res = await callAPI.get('/castle/ghost')
    dispatch(actionChangeGhostCastle(res.data))
}



