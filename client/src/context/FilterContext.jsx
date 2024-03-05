import React , { useReducer , useContext } from "react";
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
        let response = undefined;
        try {
            response = await axiosInstance.get(url);
            if(response.request.status === 200) {
                return response.data;
            }
            console.log("ERROR inside getAllCourses(), ", response);
            throw new Error("Cannot get course!");
        } catch (err) {
            // error handling
        }
        return response;
    }
    
    const getAllResources = async ()=>{
        try {
            let url = `resources?`;
            const {
                resourceSearch, 
                resourceFormat, 
                // resourceProgram, 
            } = state;
            if(resourceSearch && resourceSearch!=="" ) url +=  `search=${resourceSearch}`; 
            if(resourceFormat && resourceFormat!=="" && resourceFormat!=="Select Format") url +=  `&type=${resourceFormat}`; 
            // if(resourceProgram && resourceProgram!==""&& resourceProgram!=="Select Program") url +=  `&program=${resourceProgram}`; 

            const res = await axiosInstance.get(url);
            if(res && res.status === 200) return res.data;
            return null;
        } catch(err) {
            return null;
        }
    }
    return (
        <FilterContext.Provider
            value = {{
                ...state,
                handleChange,
                getAllCourses,
                getAllResources,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
};

export const useFilterContext = ()=>{
    return useContext(FilterContext);
}