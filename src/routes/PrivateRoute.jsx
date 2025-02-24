/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../providers/AuthProvider"


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation()
  
     if (loading) return <p>Loading...</p>
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace='true' />
  }

  export default PrivateRoute