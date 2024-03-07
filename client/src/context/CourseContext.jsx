import React, { useReducer, useContext } from "react";

import {
    HANDLE_COURSE_CHANGE,
    HANDLE_SUBJECT_CHANGE,
    GET_COURSE,
} from "./CourseAction";

import reducer from "./CourseReducer";
import axios from "axios";

const intialCourse = {};
const courseContext = React.createContext();

export const CourseProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, intialCourse);
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/v1/",
        withCredentials:true
    });

    const getCourse = async (courseId)=>{
        if(!courseId || courseId==="") return undefined;
        const url = `courses/${courseId}`;
        let response = undefined;
        try {
            response = await axiosInstance.get(url);
            if(response.status === 200) {
                dispatch({
                    type: GET_COURSE,
                    payload: {course: response.data.data}
                });
            }
        } catch(err) {
            // Handle Error
            console.log("ERROR while executing getCourse() in CourseContext.jsx\n", err);
        }
        return response.data;
    }

    const getCategoriesWiseSub = async(courseId)=>{
        let res = null;
        try{
            const url = `courses/${courseId}/categories`;
            res = await axiosInstance.get(url);
            if(res.status !== 200) {
                alert("Cannot make Request");
                return null;
            }
            return res.data
        } catch(err) {
            alert("Something went wrong!");
            return null;
        }
    }

    const getAllSubjects = async (courseId)=>{
        let res = null;
        try{
            const url = `courses/${courseId}/subjects`;
            res = await axiosInstance.get(url);
            
            if(res.status !== 200) {
                res = null;
            }
        } catch(err) {
            alert("Cannot Get Server");
        }
        return res;
    }

    const getSemestersWiseSub = async (courseId)=>{
        let res = null;
        try{
            const url = `courses/${courseId}/semesters`;
            res = await axiosInstance.get(url);
            if(res.status !== 200) {
                alert("Cannot make request!");
                res = null;
            }
        } catch(err) {
            alert("Something went wrong!");
        }
        return (!res || !res?.data)? res : res.data;
    }
    const handleChange = (name, value, subjectId) => {
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
                ...state,
                handleChange,
                getCourse,
                getCategoriesWiseSub,
                getSemestersWiseSub,
                getAllSubjects,

            }}
        >
            {children}
        </courseContext.Provider>
    )
}

export const useCourseContext = ()=> useContext(courseContext);