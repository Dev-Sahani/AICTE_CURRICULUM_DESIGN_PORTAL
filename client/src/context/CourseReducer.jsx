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
    
    throw new Error("No Such action exists");
}