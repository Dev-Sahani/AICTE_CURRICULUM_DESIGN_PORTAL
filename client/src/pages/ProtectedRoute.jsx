import { useUserContext } from '../context/UserContext';
import { FullPageLoading } from '../components';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {  
  const {user, loading} = useUserContext()

  if(loading){
    return <FullPageLoading />
  }
  else if(!user){
    return <Navigate to="/register" />
  }

  return children
}

export default ProtectedRoute