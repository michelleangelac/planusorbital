import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import PageSignUp from "./pages/PageSignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Schedules from "./pages/Schedules/Schedules";
import TodoList from "./pages/TodoList/TodoList";
import Projects from "./pages/Projects/Projects";
import Settings from "./pages/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { firebaseAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function App() {
  const { user } = useAuth() || {};
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <PageSignUp />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/resetpassword"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/schedules" element={<Schedules />}></Route>
        <Route
          path="/todolist"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}
