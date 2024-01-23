import {
    HANDLE_COURSE_CHANGE,
    HANDLE_SUBJECT_CHANGE,
    GET_COURSE,
} from "./CourseAction";

export default function reducer(state, action) {
    if(action.type === GET_COURSE) {
        return {
            ...state,
            ...action.payload.course,
        }
    }
    if(action.type === HANDLE_COURSE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        }
    }
    if(action.type === HANDLE_SUBJECT_CHANGE) {
        return {
            ...state,
            [action.payload.subjectId]: {
                ...action.payload.subjectId,
                [action.payload.name]: action.payload.value,
            }
        }
    }
    throw new Error("No Such action exists");
}