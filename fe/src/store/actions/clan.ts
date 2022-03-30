import callAPI from "callAPI"

export const CHANGE_SHOW_CREATE_CLAN = 'CHANGE_SHOW_CREATE_CLAN'

export const actionChangeShowCreateClan = function (showCreateClan) {
    return {
        type : CHANGE_SHOW_CREATE_CLAN,
        payload : {showCreateClan}
    }
}

export const CHANGE_CLAN = 'CHANGE_CLAN'

export const actionChangeClan = function(clan) {
    return {
        type : CHANGE_CLAN,
        payload : {clan}
    }
}

export const asyncGetClan = () => async dispatch => {
    const {data} = await callAPI.get(`/clan`)
    dispatch(actionChangeClan(data))
}

export const CHANGE_CLAN_DETAIL = 'CHANGE_CLAN_DETAIL'

export const actionChangeClanDetail = function(clanDetail) {
    return {
        type : CHANGE_CLAN_DETAIL,
        payload : {clanDetail}
    }
}

export const asyncGetClanDetail = (id) => async dispatch => {
    const {data} = await callAPI.get(`/clan/${id}`)
    dispatch(actionChangeClanDetail(data))
}

export const CHANGE_CLAN_REQUEST = 'CHANGE_CLAN_REQUEST'

export const actionChangeClanRequest = function(clanRequest) {
    return {
        type : CHANGE_CLAN_REQUEST,
        payload : {clanRequest}
    }
}

export const asyncGetClanRequest = (id) => async dispatch => {
    const {data} = await callAPI.get(`/clan/join/${id}`)
    dispatch(actionChangeClanRequest(data))
}