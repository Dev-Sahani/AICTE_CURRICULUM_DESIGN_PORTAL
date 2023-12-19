import {
    HANDLE_LOADING,
    SETUP_USER,
    ALERT,
} from "./UserAction"

export default function reducer({action, state}){
    if(action.type === ALERT) {
        return {
            ...state,
            alert: action.payload,
        }
    }
    if(action.type === HANDLE_LOADING) {
        return {
            ...state,
            loading: action.payload,
        }
    }
    if(action.type === SETUP_USER) {
        return {
            ...state,
            user: action.payload,
        }
    }
    throw new Error("No such action in User Reducer")
}