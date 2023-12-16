import React, { useContext, useReducer } from 'react'
import {
    HANDLE_CHANGE,
    // HANDLE_SAVE,
    HANDLE_SUBJECT_CHANGE,
} from "./ChangesAction"
import reducer from "./ChangesReducer"

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

    return (
        <ChangesContext.Provider
            value={{
                ...states,
                handleChange,
                handleSave,
                handleSubjectChange,
            }}
        >
            {children}
        </ChangesContext.Provider>
    )
}


export const useChangeContext = ()=>{
    return useContext(ChangesContext);
}