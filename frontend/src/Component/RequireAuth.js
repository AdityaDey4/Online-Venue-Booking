import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import {jwtDecode} from "jwt-decode";

const RequireAuth = ({allowedRoles}) => {

  const {auth} = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken
                  ? jwtDecode(auth.accessToken)
                  :undefined;

  const role = decoded?.UserInfo?.role || 0;
  // console.log(role);
  // console.log(allowedRoles);

  return (
    !allowedRoles || allowedRoles.includes(role)
      ? <Outlet />
      : auth?.email 
        ? <Navigate to={'/unauthorized'} state={{from : location}} replace />
        : <Navigate to={'/login'} state={{from : location}} replace />
  )
}

export default RequireAuth;