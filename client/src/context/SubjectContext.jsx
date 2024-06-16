import { useReducer, useContext, createContext } from "react";
import { reducer } from "./SubjectReducer";
import axios from "axios";
import { useUserContext } from "./UserContext";
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
    const { setLoading } = useUserContext();

    const base_url = process.env.REACT_APP_URL
    const axiosInstance = axios.create({
        baseURL: base_url+"/api/v1/subjects",
        withCredentials:true
    });

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
            res = await axiosInstance.get(url);
            if(!res || !res.data || !res.data.data) return undefined;
            
            if(res.data.data.modules?.del?.length > 0) {
                res.data.data.modules.del.forEach(({index, by}, delIndex)=>{
                    res.data.data.modules.cur[index].new.push(
                        {value: "deleted", by, delIndex}
                    );
                })
            } 

            dispatch({
                type: UPDATE_SUBJECT_DETAILS,
                payload: res.data.data, 
            })
        } catch(err) {
            alert(err.response?.data?.message || err.message || "Cannot get subject!");
            console.log(err);
            res = undefined;
        }
        return res?.data;
    }

    const updateProperty = async (name, value, subjectId, del=false)=>{
        let res = undefined;
        if(!name || (!value && !del) || subjectId===undefined) return res;
        try {
          const url = `/update-by-user/${subjectId}`;

          res = await axiosInstance.patch(url, {
            prop: name, 
            data: value, 
            del: del
          });

        } catch(err) {
            res = undefined;
            alert(err.response?.data?.message || err.message);
            console.log(err);
        }
        return res;
    }

    const addProperty = async (name, value, subjectId)=>{
        let res = undefined;
        if(!name || !value || !subjectId) return res;
        try {
            const url = `/update-by-user/${subjectId}`;
            
            res = await axiosInstance.patch(url, {
                isnew: true,
                prop: name,
                data: value, 
            });

            await getSubject(subjectId);
        } catch(err) {
            console.log(err);
            alert(err.response?.data?.message || err.message);
        }
        return res;
    }

    const acceptChanges = async (subjectId, prop, index, isNew, del=false)=> {
        const url = `/accept-updates/${subjectId}`;
        let res = undefined;
        try { 
            if(!prop || index===undefined || !subjectId) 
                throw new Error("Bad Request!");
            
            setLoading(true);

            res = await axiosInstance.patch(url, {
                prop,
                index,
                isnew: isNew,
                del,
            });
            if(!res) throw new Error("Something went wrong!");

            await getSubject(subjectId);
        } catch(err) {
            res = null;
            alert(err.response?.data?.message || err.message);
            console.log(err);
        }
        setLoading(false);
        return res;
    }

    const acceptChangesInModule = async (subjectId, moduleIndex, changeIndex, isNew, del=false)=> {
        const url = `/accept-modules-updates/${subjectId}`;
        let res = undefined;
        try { 
            setLoading(true);

            res = await axiosInstance.patch(url, {
                moduleIndex, 
                changeIndex,
                isnew: isNew,
                del,
            });
            if(!res) throw new Error("Something went wrong!");

            await getSubject(subjectId);
        } catch(err) {
            res = null;
            alert(err.response?.data?.message || err.message);
            console.log(err);
        }
        setLoading(false);
        return res;
    }

    const updateModule = async (subjectId, data, isNew, index, del) => {
        let res = undefined;
        
        try {
            const url = `/update-module-by-user/${subjectId}`;

            if((!del && !isNew && !index) || (isNew && !data) || (del && index===undefined) || subjectId===undefined)
                throw new Error("Request has some missing parameters!")
          
            res = await axiosInstance.patch(url, {
              data,  
              isnew: isNew, 
              index, 
              del,
            }); 

            await getSubject(subjectId);

        } catch(err) {
            res = undefined;
            alert(err.response?.data?.message || err.message);
            console.log(err);
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
            acceptChanges, 
            acceptChangesInModule, 
            updateModule, 
          }}
        >
            {children}
        </SubjectContext.Provider>
    )
}

export const useSubjectContext = ()=>useContext(SubjectContext);