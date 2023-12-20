import {
    HANDLE_LOADING,
    SETUP_USER,
    ALERT,
} from "./UserAction"

export default function reducer(state, action){
    if(action&& action.type === ALERT) {
        return {
            ...state,
            alert: action.payload,
        }
    }
    if(action&& action.type === HANDLE_LOADING) {
        return {
            ...state,
            loading: action.payload,
        }
    }
    if(action&& action.type === SETUP_USER) {
        return {
            ...state,
            user: action.payload,
        }
    }
    throw new Error("No such action in User Reducer")
}