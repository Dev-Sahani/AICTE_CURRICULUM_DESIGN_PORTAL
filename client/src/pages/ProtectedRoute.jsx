import React from 'react'
import RegisterPage from './RegisterPage';

const ProtectedRoute = ({children}) => {  
  // return <RegisterPage />
  return children;
}

export default ProtectedRoute