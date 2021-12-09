import {
    GLOBAL_ERROR,
    GLOBAL_SUCCESS,
    CLEAR_NOTIFICATION
} from '../types'

export default function notificationReducer(state={},action) {
    switch(action.type){
        case GLOBAL_ERROR:
            return {...state, error: true, msg: action.payload}
        case GLOBAL_SUCCESS:
            return {...state, success: true, msg: action.payload}
        case CLEAR_NOTIFICATION:
            return {}
        default:
            return state
    }
}