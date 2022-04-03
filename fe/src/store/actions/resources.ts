import callAPI from "callAPI"

export const CHANGE_RESOURCES = 'CHANGE_RESOURCES'

export const actionChangeResources = function(resources) {
    return {
        type : CHANGE_RESOURCES,
        payload : {resources}
    }
}

export const asyncGetResources = (castle? : string) => async dispatch => {
    const res = await callAPI.get(`/resources${castle ? '?castle=' + castle : ''}`)
    dispatch(actionChangeResources(res.data))
}