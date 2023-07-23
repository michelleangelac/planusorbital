import React from "react";
import { Navigate, Route, Outlet, useLocation } from "react-router-dom";
import {firebaseAuth, useAuth} from "../hooks/useAuth";

export const ProtectedRoute = ({children}) =>  {
    var user = useAuth();
    return typeof user === 'null' ? (
        <h1>Loading.....</h1>
      ) : user ? (
        children
      ) : (
        <Navigate to = "/login"/>
      );
}