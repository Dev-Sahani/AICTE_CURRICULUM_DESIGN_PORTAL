
import {
    UPDATE_SUBJECT_DETAILS, 
} from "./SubjectAction";

export const reducer = (states, action)=>{
    if(action.type === UPDATE_SUBJECT_DETAILS) {
        return {
            ...states,
            subject : {...action.payload}, 
        }
    }
}