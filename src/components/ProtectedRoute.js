import React from "react";
import { Navigate, Route, Outlet, useLocation } from "react-router-dom";
import {firebaseAuth} from "../hooks/useAuth";

export const ProtectedRoute = ({children}) =>  {
    var user = firebaseAuth.currentUser;
    const location = useLocation();
    if(user) {
        return children;
    }
    return <Navigate to = "/login"/>;
}