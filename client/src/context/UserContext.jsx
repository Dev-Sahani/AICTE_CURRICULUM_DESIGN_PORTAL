import React, { useContext, useReducer } from "react";
import reducer from "./UserReducer";
import axios from "axios";

import {
    HANDLE_LOADING,
    SETUP_USER,

} from "./UserAction"

const initialState = {
    loading: false,
    user: null,
};

const UserContext = React.createContext();

export const UserProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const axiosInstance = axios.create({baseURL: "http://localhost:8080/api/v1/"});
    
    axiosInstance.interceptors.response.use((response)=>{
        return response;
    }, (err)=>{
        // console.log(err.response);
        if(err.response.status === 401){
            // logoutUser();
        }
        return Promise.reject(err);
    })

    const loginAdmin = async ({userId, password})=>{
        loading(true);
        try {
            const url = `auth/login-admin/`
            const response = await axiosInstance.post(url, {email: userId, password,})
            if(response.status !== 200) {
                alert("Invalid Credential");
                return;
            }
            dispatch({
                type: SETUP_USER,
                payload: response.data.user,
            })
        } catch(err) {
            alert("Cannot Login User at the moment Sorry for the inconvenience")
        }   
        loading(false);
    }
    const sendAdminOTP = async ({email})=>{
        if(
            // !email.endsWith("@aicte-india.org") || 
        !email || email === "") {
            return null;
        }
        let res;
        try{
            console.log("check");
            res = await axiosInstance.post("auth/send-otp", {email,});
            // console.log(res);
            if(res.status !== 200) return null;
                       
        } catch (err){
            alert("Cannot send OTP at the moment Sorry for the inconvenience");
            return null;
        }
        return res;
    }

    const setupAdminPassword = async ({name, password})=>{
        loading(true);
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
            alert("Cannot set up details")
        }
    }

    const verifyAdminOTP = async ({email, otp})=>{
        // loading(true);
        // let response = null;
        // try{
        //     console.log(email, otp)
        //     response = await axiosInstance.post("auth/verify-otp", {email, otp});
        //     console.log(response);
        //     if(response && response.status !== 200) {
        //         alert("Invalid Credentials");
        //         return null;
        //     }
        //     dispatch({
        //         type: SETUP_USER,
        //         payload: response.data,
        //     })
        // } catch(err) {
        //     alert("Cannot send OTP at the moment Sorry for the inconvenience");
        //     return null;
        // }
        // loading(false);
        // return response;
        try {
            const res = await axiosInstance("auth/verify-otp", {email, otp});
            if(!res) {
                alert("Invalid Credential");
                return null;
            }
            dispatch({
                type: SETUP_USER,
                payload: res.data,
            });
            return res;
        } catch(err) {
            alert("Cannot Verify")
            return null;
        }
    }

    const loginDeveloper = async ({userId, password})=>{
        loading(true);
        try{
            const response = await axiosInstance("auth/login-developer", {userId, password});

        } catch(err) {
            alert("Invalid Credentials");
        }
        loading(false);
    }

    const createUser = async ({name, email, role})=>{
        loading(true);
        try {
            const response = await axiosInstance.post("auth/register-user", {name, email, role});
            if(response.status !== 200) {
                alert("cannot create user");
                return;
            }
            return {
                userId: response.data.data.userId, 
                userName: response.data.data.password
            };
        } catch(err) {
            alert("Invalid Credentials");
        }
        loading(false);
    }

    const loading = (value)=>{
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
                loading,
                loginAdmin,
                sendAdminOTP,
                setupAdminPassword,
                verifyAdminOTP,
                loginDeveloper,
                createUser,

            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = ()=>useContext(UserContext);