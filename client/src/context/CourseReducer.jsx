import {
    HANDLE_COURSE_CHANGE,
    HANDLE_SUBJECT_CHANGE,
    GET_COURSE,
    GET_ALL_SUBJECTS,
} from "./CourseAction";

export default function reducer(state, action) {
    if(action.type === GET_COURSE) {
        return {
            ...state,
            ...action.payload.course,
        }
    }
    else if(action.type === GET_ALL_SUBJECTS){
        return {
            ...state,
            "allSubjects":action.payload
        }
    }
    
    throw new Error("No Such action exists");
}