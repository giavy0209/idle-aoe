import callAPI from "callAPI"
import { toast } from "react-toastify"

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

export const CHANGE_UPGRADE = 'CHANGE_UPGRADE'

export const actionChangeUpgrade = function(upgrade) {
    return {
        type : CHANGE_UPGRADE,
        payload : {upgrade}
    }
}

export const asyncGetUpgrade = (building) => async dispatch => {
    const {data, status} = await callAPI.get(`/upgrade?building=${building.name}`)
    if(status === 101) toast('Your building is max level')
    dispatch(actionChangeUpgrade({
        ...data,
        generateText : building.generateText,
        unit : building.unit
    }))
    
}