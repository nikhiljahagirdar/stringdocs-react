import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../pages/common/unauthorized";


const ProtectedRoute = ({ element, allowedRoles }) => {
 
  const user = useSelector((state) => state.auth.user);
  return user.role && allowedRoles.includes(user.role) ? element : <Unauthorized/>
};

export default ProtectedRoute;
