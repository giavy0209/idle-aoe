import callAPI from "callAPI"

export const CHANGE_UNIT = 'CHANGE_UNIT'

export const actionChangeUnits = function(units) {
    return {
        type : CHANGE_UNIT,
        payload : {units}
    }
}

export const asyncGetUnits = (castle? : string) => async dispatch => {
    const res = await callAPI.get(`/units${castle ? '?castle=' + castle : ''}`)
    dispatch(actionChangeUnits(res.data))
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

export const asyncGetTranningQueue = (castle? : string) => async dispatch => {
    const {data} = await callAPI.get(`/trainning-queue${castle ? '?castle=' + castle : ''}`)
    dispatch(actionChangeTranningQueue(data))
}