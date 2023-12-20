import React, { useEffect } from 'react'
import RegisterPage from './RegisterPage';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({children}) => {  
  // return <RegisterPage />
  const {user} = useUserContext()
  const navigate = useNavigate()
  console.log(user)

  useEffect(()=>{
    if(user) return children;
    navigate("/register")
  }, [user])
  // const [state, dispatch] = useReducer(reducer, initialState);
  return;
}

export default ProtectedRoute