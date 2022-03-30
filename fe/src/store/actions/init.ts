import callAPI from "callAPI"
import storage from "helpers/storage"
import { asyncGetActivity } from "./battle"
import { asyncGetBuildings } from "./building"
import { asyncGetResources } from "./resources"
import { asyncGetTranningQueue, asyncGetUnits } from "./unit"
import { asyncGetUser } from "./user"

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