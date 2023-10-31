import { Navigate } from "react-router-dom";
import React from "react";
import { JwtUtils } from "../../utils";

const ProtectedRoute = ({ children, roles }): JSX.Element => {
    const token = localStorage.getItem("token");
    const userRol = JwtUtils.getRolesByToken(token!);

    if (!(roles.includes(userRol))) {
        return <Navigate to="/" />;
    }
    return children;
};
export default ProtectedRoute;
