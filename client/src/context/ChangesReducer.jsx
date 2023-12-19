import {
    HANDLE_CHANGE,
    HANDLE_SAVE,
    HANDLE_SUBJECT_CHANGE,
} from "./ChangesAction"

export default function reducer(states, action) {
    if(action.type === HANDLE_CHANGE) {
        return {
            ...states,
            [action.payload.name]: action.payload.value,
        };
    }
    if(action.type === HANDLE_SAVE) {
        return {
            ...states,
        }
    }
    if(action.type === HANDLE_SUBJECT_CHANGE) {
        return {
            ...states,
            [action.payload.subjectId]: {
                ...states[action.payload.subjectId],
                [action.payload.name]: action.payload.value,
            }
        }
    }
    throw new Error("No Such action in ChangesReducer");
}