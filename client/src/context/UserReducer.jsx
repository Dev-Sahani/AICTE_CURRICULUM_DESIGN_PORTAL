import {
    HANDLE_LOADING,
    SETUP_USER,
    REMOVE_USER,
    ALERT,
} from "./UserAction"

export default function reducer(state, action){
    if(action.type === ALERT) {
        return {
            ...state,
            alert: action.payload,
        }
    }
    else if(action.type === HANDLE_LOADING) {
        return {
            ...state,
            loading: action.payload,
        }
    }
    else if(action.type === SETUP_USER) {
        return {
            ...state,
            user: action.payload,
        }
    }
    else if(action.type === REMOVE_USER){
        return {
            ...state,
            user:undefined
        }
    }
    throw new Error("No such action in User Reducer")
}