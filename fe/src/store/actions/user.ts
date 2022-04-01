import callAPI from "callAPI"

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