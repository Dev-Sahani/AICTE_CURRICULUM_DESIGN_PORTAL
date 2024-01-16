import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./UserReducer";
import axios from "axios";

import {
    HANDLE_LOADING,
    SETUP_USER,
    ALERT
} from "./UserAction"

const initialState = {
    loading: false,
    user: null,
};

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const axiosInstance = axios.create({baseURL: "http://localhost:8080/api/v1/"});
    
    const getCurrUser = async ()=>{
        setLoading(true)
        try{
            const res = await axiosInstance.get("/auth/verify-token",{
                withCredentials:true
            })
            if(res.status !== 200){
                dispatch({
                    type:ALERT,
                    payload:"cannot verify user please login again"
                })
            }
            const {user} = res.data;
            dispatch({
                type: SETUP_USER,
                payload: user,
            })
        }
        catch(err){
            // logout()
        }
        setLoading(false)
    }
    useEffect(()=>{
        getCurrUser();
    }, [])
    
    axiosInstance.interceptors.response.use((response)=>{
        return response;
    }, (err)=>{
        // console.log(err.response);
        if(err.response.status === 401){
            // logoutUser();
        }
        return Promise.reject(err);
    })

    const loginAdmin = async ({email, password})=>{
        setLoading(true);
        try {
            const response = await axiosInstance.post(`auth/login-admin/`, {email, password},{withCredentials:true})
            if(response.status !== 200) {
                dispatch({
                    type:ALERT,
                    payload:"Invalid Credentials"
                })
                return;
            }
            dispatch({
                type: SETUP_USER,
                payload: {
                    name:response.data.user.name,
                    email:response.data.user.email
                }
            })
            setLoading(false)
            return response
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Cannot Login User at the moment Sorry for the inconvenience"
            })
            setLoading(false);
            return null;
        }   
    }
    const sendAdminOTP = async ({email})=>{
        if(
            // !email.endsWith("@aicte-india.org") || 
        !email || email === "") {
            return null;
        }
        let res;
        try{
            res = await axiosInstance.post("auth/send-otp", {email,});
            // console.log(res);
            if(res.status !== 200) return null;
                       
        } catch (err){
            dispatch({
                type:ALERT,
                payload:"Cannot send OTP at the moment Sorry for the inconvenience"
            })
            return null;
        }
        return res;
    }

    const setupAdminPassword = async ({name, password})=>{
        setLoading(true);
        try{
            const res = await axiosInstance("auth/set-up-admin", {name, password});
            if(res.status !== 200) throw new Error();
            dispatch({
                type: SETUP_USER,
                payload: {
                    ...state,
                    user: {
                        ...state.user,
                        name,
                        password,
                    }
                }
            })
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Cannot set up details"
            })
        }
    }

    const verifyAdminOTPAndRegister = async ({name, password, email, otp})=>{
        try {
            const res = await axiosInstance.post("/auth/verify-otp", {email, otp});
            if(res.status !== 200) {
                dispatch({
                    type:ALERT,
                    payload:"Invalid OTP"
                })
                return null;
            }
            const res2 = await axiosInstance.post("/auth/register-admin", {
                name, email,password
            },{withCredentials:true})
            if(res2.status !== 201) {
                dispatch({
                    type:ALERT,
                    payload:res2.message
                })
                return null;
            }
            dispatch({
                type: SETUP_USER,
                payload: {name,email},
            });
            return res;
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Error while verifying OTP"
            })
        }
    }

    const loginDeveloper = async ({userId, password})=>{
        setLoading(true);
        try{
            const res = await axiosInstance.post("auth/login-developer", {userId, password},{
                withCredentials:true
            });
            
            dispatch({
                type:SETUP_USER,
                payload:res.data.users
            })

        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Invalid Credentials"
            })
        }
        setLoading(false);
    }

    const createUser = async ({name, email, role})=>{
        setLoading(true);
        try {
            const response = await axiosInstance.post("auth/register-user", {name, email, role});
            if(response.status !== 200) {
                dispatch({
                    type:ALERT,
                    payload:"Cannot create User"
                })
                return;
            }
            return {
                userId: response.data.data.userId, 
                userName: response.data.data.password
            };
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Invalid Credentials"
            })
        }
        setLoading(false);
    }

    const setLoading = (value)=>{
        if(!value) value = false;
        dispatch({
            type: HANDLE_LOADING,
            payload: value,
        })
    }

    return (
        <UserContext.Provider
            value={{
                ...state,
                setLoading,
                loginAdmin,
                sendAdminOTP,
                setupAdminPassword,
                verifyAdminOTPAndRegister,
                loginDeveloper,
                createUser,
                getCurrUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = ()=>useContext(UserContext);