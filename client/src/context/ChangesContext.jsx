import React, { useContext, useReducer } from 'react'
import {
    HANDLE_CHANGE,
    // HANDLE_SAVE,
    HANDLE_SUBJECT_CHANGE,
} from "./ChangesAction"
import reducer from "./ChangesReducer"
import axios from 'axios'

export const initialStates = {};
const ChangesContext = React.createContext();

export function ChangesProvider({children}) {
    const [states, dispatch] = useReducer(reducer, initialStates);

    const handleChange = (name, value) =>{
        dispatch({
            type: HANDLE_CHANGE,
            payload: {name, value},
        });
    };

    const handleSubjectChange = (subjectId, name, value)=>{
        dispatch({
            type: HANDLE_SUBJECT_CHANGE,
            payload: { subjectId, name, value },
        })
    }

    const handleSave = ()=>{
        localStorage.setItem("changes", states);
    }

    const handlePush = async ()=>{

        await axios.post("api/v1/push",{
            courses:{},
            subjects:[]
        })
    }

    return (
        <ChangesContext.Provider
            value={{
                ...states,
                handleChange,
                handleSave,
                handleSubjectChange,
                handlePush
            }}
        >
            {children}
        </ChangesContext.Provider>
    )
}


export const useChangeContext = ()=>{
    return useContext(ChangesContext);
}