import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";

import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Schedules from "./pages/Schedules/Schedules";
import TodoList from "./pages/TodoList/TodoList";
import Groups from "./pages/Groups";
import Projects from "./pages/Projects/Projects";
import Content from "./pages/Projects/Content";
import Settings from "./pages/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { firebaseAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PublicRoute><PageLogin /></PublicRoute>}></Route>
        <Route path='/login' element={<PublicRoute><PageLogin /></PublicRoute>}></Route>
        <Route path='/signup' element={<PublicRoute><PageSignUp /></PublicRoute>}></Route>
        <Route path='/resetpassword' element={<PublicRoute><ResetPassword /></PublicRoute>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
        <Route path='/schedules' element={<Schedules/>}></Route>
        <Route path='/todolist' element={<ProtectedRoute><TodoList /></ProtectedRoute>}></Route>
        <Route path='/groups' element={<Groups/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/content' element={<Content/>}></Route>
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>}></Route>
      </Routes>
    </div>
  );
}
