import callAPI from "callAPI"
import storage from "helpers/storage"
import { asyncGetActivity } from "./battle"
import { asyncGetBuildings } from "./building"
import { asyncGetMarketOffer } from "./market"
import { asyncGetResources } from "./resources"
import { asyncGetTranningQueue, asyncGetUnits } from "./unit"
import { asyncGetCurrentCastle, asyncGetUser } from "./user"

export const asyncInit = () => async dispatch => {
    const { status } = await callAPI.get('/valid-jwt')
    if (status === 1) {
        dispatch(asyncGetUser())
        dispatch(asyncGetCurrentCastle())
    }
    if (status === 0) {
        storage.clearToken()
    }
}

export const asyncChangeCastle = (castle_id : string) => async dispatch => {
    dispatch(asyncGetResources(castle_id))
    dispatch(asyncGetBuildings(castle_id))
    dispatch(asyncGetUnits(castle_id))
    dispatch(asyncGetTranningQueue(castle_id))
    dispatch(asyncGetActivity(castle_id))
    dispatch(asyncGetMarketOffer(castle_id))
}