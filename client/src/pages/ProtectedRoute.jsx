import { useUserContext } from '../context/UserContext';
import Loading from '../components/Loading';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {  
  const {user, loading} = useUserContext()

  if(loading){
    return <Loading />
  }
  else if(!user){
    return <Navigate to="/register" />
  }

  return children
}

export default ProtectedRoute