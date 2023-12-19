import React , { useReducer , useContext, useState } from "react";
import { reducer } from "./FilterReducer"
import axios from "axios"

import {
    HANDLE_CHANGE,
} from "./FilterAction"


const FilterContext = React.createContext();

export const initialStates = {

};

export const FilterProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialStates);
    
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/v1/',
        timeout: 10000, 
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const handleChange = ({name, value})=>{
        console.log(`Name = ${name}, Value = ${value}`);
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value,
            }
        })
    }

    const getAllCourses = async ()=>{
        const {courseSearch, courseLevel, courseProgram} = state;

        let query = "?";
        if(courseSearch && courseSearch!=="") query += `search=${courseSearch}`;
        if(courseLevel && courseLevel.toLowerCase()!=="select") query += `&level=${courseLevel}`;
        if(courseProgram && courseProgram.toLowerCase()!=="select") query += `&search=${courseProgram}`;

        const url = `courses${query}`
        const response = await axiosInstance.get(url);
        console.log(response);
        if(response.request.status === 200) {
            return response.data;
        }
        return new Error("Cannot get courses");
    }
    
    return (
        <FilterContext.Provider
            value = {{
                ...state,
                handleChange,
                getAllCourses,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
};

export const useFilterContext = ()=>{
    return useContext(FilterContext);
}