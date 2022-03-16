import callAPI from "callAPI"

export const CHANGE_LOADING = 'CHANGE_LOADING'

export const actionChangeLoading = function (isLoading) {
    return {
        type : CHANGE_LOADING,
        payload : {isLoading}
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

export const asyncInit = () => async dispatch => {
    dispatch(asyncGetUser())
    dispatch(asyncGetResources())
    dispatch(asyncGetBuildings())
}

export const CHANGE_UPGRADE = 'CHANGE_UPGRADE'

export const actionChangeUpgrade = function(upgrade) {
    return {
        type : CHANGE_UPGRADE,
        payload : {upgrade}
    }
}

export const asyncGetUpgrade = (building) => async dispatch => {
    const {data} = await callAPI.get(`/upgrade?building=${building}`)
    dispatch(actionChangeUpgrade(data))
    
}