import callAPI from "callAPI"

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