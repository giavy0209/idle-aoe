import callAPI from "callAPI"
import { toast } from "react-toastify"
import store from "store"

export const CHANGE_BUILDING = 'CHANGE_BUILDING'

export const actionChangeBuildings = function(buildings) {
    return {
        type : CHANGE_BUILDING,
        payload : {buildings}
    }
}

export const asyncGetBuildings = (castle? : string) => async dispatch => {
    const res = await callAPI.get(`/buildings${castle ? '?castle=' + castle : ''}`)
    dispatch(actionChangeBuildings(res.data))
}

export const CHANGE_UPGRADE = 'CHANGE_UPGRADE'

export const actionChangeUpgrade = function(upgrade) {
    return {
        type : CHANGE_UPGRADE,
        payload : {upgrade}
    }
}

export const asyncGetUpgrade = (building) => async dispatch => {
    const state = store.getState() as any
    
    const currentCastle = state.currentCastle
    
    const {data, status} = await callAPI.get(`/upgrade?building=${building.name}&castle=${currentCastle._id}`)
    if(status === 101) return toast('Your building is max level')
    return dispatch(actionChangeUpgrade({
        ...building,
        ...data,
    }))
    
}