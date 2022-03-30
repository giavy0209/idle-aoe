export const CHANGE_LOADING = 'CHANGE_LOADING'

export const actionChangeLoading = function (isLoading) {
    return {
        type : CHANGE_LOADING,
        payload : {isLoading}
    }
}

export const CHANGE_MODAL_ACTIVITY = 'CHANGE_MODAL_ACTIVITY'

export const actionChangeModalActivity = function (modalActivity) {
    return {
        type : CHANGE_MODAL_ACTIVITY,
        payload : {modalActivity}
    }
}
