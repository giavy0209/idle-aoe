export const ACTION = 'ACTION'

export const actionChangeAction = function (action : any) {
    return {
        type : ACTION,
        payload : action
    }
}