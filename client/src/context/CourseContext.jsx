import React, { useReducer, useContext } from "react";

import {
    HANDLE_COURSE_CHANGE,
    HANDLE_SUBJECT_CHANGE,
} from "./CourseAction";

import reducer from "./CourseReducer";

const intialCourse = {};
const courseContext = React.createContext();

export const CourseProvider = ({children})=>{
    const [course, dispatch] = useReducer(reducer, intialCourse);

    const getCourse = async (courseId)=>{
        
    }

    const handleChange = (name, value, subjectId) => {
        const obj = {name, value};
        if(subjectId && subjectId !== "") {
            dispatch({
                type: HANDLE_SUBJECT_CHANGE,
                payload: {name, value, subjectId},
            })
        } else {
            dispatch({
                type: HANDLE_COURSE_CHANGE,
                payload: {name, value}
            })
        }
    }
    return (
        <courseContext.Provider
            value={{
                ...course,
                handleChange,
            }}
        >
            {children}
        </courseContext.Provider>
    )
}

export const useCourseContext = ()=> useContext(courseContext);