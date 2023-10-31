import React from 'react'

const ProtectedRoute = ({children}) => {
  return (
    <div>
        <div>PROTECTED</div>
        {children}
    </div>
  )
}

export default ProtectedRoute