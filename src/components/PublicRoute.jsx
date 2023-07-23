import React from "react";
import { Navigate, Route, Outlet, useLocation } from "react-router-dom";
import {firebaseAuth} from "../hooks/useAuth";

export const PublicRoute = ({children}) =>  {
    var user = firebaseAuth.currentUser;
    const location = useLocation();
    if(user) {
        return <Navigate to = "/dashboard"/>;
    }
    return children;
}