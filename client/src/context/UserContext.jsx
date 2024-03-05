import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./UserReducer";
import axios from "axios";

import {
    HANDLE_LOADING,
    SETUP_USER,
    ALERT,
    REMOVE_USER,
} from "./UserAction"

const initialState = {
    loading: false,
    user: null,
};

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const axiosInstance = axios.create({baseURL: "http://localhost:8080/api/v1/"});

    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        }, (err)=>{
            console.log("response interceptor ",err);
            if(err.response.status >= 401){
                // logoutUser();
            }
            return Promise.reject(err);
        }
    )
    
    const getCurrUser = async ()=>{
        setLoading(true)
        try{
            const res = await axiosInstance.get("/auth/verify-token",{
                withCredentials:true
            })
            const {user} = res.data;
            dispatch({
                type: SETUP_USER,
                payload: user,
            })
        }
        catch(err){
            logout()
        }
        setLoading(false)
    }
    useEffect(()=>{
        getCurrUser();
    // eslint-disable-next-line
    }, [])
    
    const login = async ({email, password})=>{
        setLoading(true);
        try {
            const response = await axiosInstance.post(`auth/login/`, {email, password},{withCredentials:true})
            dispatch({
                type: SETUP_USER,
                payload: {
                    name:response.data.user.name,
                    email:response.data.user.email
                }
            })
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Invalid Credentials while login"
            })
        }finally{
            setLoading(false)
        }
    }
    const sendAdminOTP = async ({email})=>{
        if(!email || email === "") {
            return null;
        }
        setLoading(true)
        try{
            await axiosInstance.post("auth/send-otp", {email});
        } catch (err){
            dispatch({
                type:ALERT,
                payload:"Cannot send OTP at the moment Sorry for the inconvenience"
            })
        }finally{
            setLoading(false)
        }
    }

    const setupAdminPassword = async ({name, password})=>{
        setLoading(true);
        try{
            const res = await axiosInstance("auth/set-up-admin", {name, password});
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
        setLoading(true);
        try {
            await axiosInstance.post("/auth/register-admin", {
                name, email,password, otp
            },{withCredentials:true})

            dispatch({
                type: SETUP_USER,
                payload: {name,email},
            });
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:"Error while verifying OTP"
            })
        }finally{
            setLoading(false)
        }
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

    const logout = async ()=>{
        setLoading(true);
        try {
            await axiosInstance.post("auth/logout", {},{
                withCredentials:true
            });
            dispatch({
                type:REMOVE_USER
            })
        } catch(err) {
            dispatch({
                type:ALERT,
                payload:`Logout fail! server Respoded with ${err.status}`
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
                login,
                sendAdminOTP,
                setupAdminPassword,
                verifyAdminOTPAndRegister,
                logout,
                createUser,
                getCurrUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = ()=>useContext(UserContext);