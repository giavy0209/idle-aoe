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