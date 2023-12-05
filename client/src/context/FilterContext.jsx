import React , { useReducer , useContext } from "react";
import { reducer } from "./FilterReducer"

import {
    HANDLE_CHANGE,
} from "./FilterAction"


const FilterContext = React.createContext();

export const initialStates = {

};

export const FilterProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialStates);
    
    const handleChange = ({name, value})=>{
        console.log(`Name = ${name}, Value = ${value}`);
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value,
            }
        })
    }

    
    return (
        <FilterContext.Provider
            value = {{
                ...state,
                handleChange,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
};

export const useFilterContext = ()=>{
    return useContext(FilterContext);
}