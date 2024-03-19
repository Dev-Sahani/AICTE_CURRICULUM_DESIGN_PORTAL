import { useReducer, useContext, createContext } from "react";
import { reducer } from "./SubjectReducer";
import axios from "axios";
import {
    UPDATE_SUBJECT_DETAILS, 
} from "./SubjectAction";

const SubjectContext = createContext();
const intialState = {
    loading: false, 
    error: false,
    subject: undefined, 
};

export const SubjectProvider = ({children})=>{
    const [states, dispatch] = useReducer(reducer, intialState);

    const axiosInstance = axios.create({baseURL: "http://localhost:8080/api/v1/subjects/"});

    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        }, (err)=>{
            if(err.response.status >= 401){
                // logoutUser();
            }
            return Promise.reject(err);
        }
    )

    const getSubject = async(subjectId)=> {
        let res = undefined
        if(!subjectId || subjectId==="") return res;
        const url = `/${subjectId}`;
        try {
            res = await axiosInstance.get(url, {withCredentials: true});
            if(!res || !res.data || !res.data.data) return undefined;
            dispatch({
                type: UPDATE_SUBJECT_DETAILS,
                payload: res.data.data, 
            })
        } catch(err) {
            alert("Cannot get subject!");
            console.log(err);
            res = undefined;
        }
        return res.data;
    }

    const updateProperty = async (name, value, subjectId)=>{
        let res = undefined;
        if(!name || !value) return res;
        try {
          const data = {prop: name, data: value}
          const url = `/update-by-user/${subjectId}`;
          console.log(url, data);
          res = await axiosInstance.patch(url, data, {withCredentials: true,});

        } catch(err) {
            res = undefined;
            alert(err.message);
            console.log(err);
        }
        return res;
    }

    const addProperty = async (name, value, subjectId)=>{
        let res = undefined;
        if(!name || !value || !subjectId) return res;
        try {
            const url = `/update-by-user/${subjectId}`;
            res = await axiosInstance(url, {
                isnew: true,
                prop: name,
                data: value?.cur, 
            });
        } catch(err) {
            console.log(err);
            alert(err.message);
        }
        return res;
    }
    return (
        <SubjectContext.Provider
          value ={{
            ...states, 
            getSubject, 
            updateProperty, 
            addProperty, 
          }}
        >
            {children}
        </SubjectContext.Provider>
    )
}

export const useSubjectContext = ()=>useContext(SubjectContext);