
const initState = {}
const reducers = function (state = initState, action: { type: String }) {
    switch (action.type) {
        case '1': {
            return {
                ...state,
            }
        }
        default:
            return {
                ...state,
            }
    }
}

export default reducers