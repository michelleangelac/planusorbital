import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";

import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Schedules from "./pages/Schedules";
import TodoList from "./pages/TodoList";
import Groups from "./pages/Groups";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";

export default function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Routes>
        {user ? <Route path='/' element={<Dashboard />}></Route> : <Route path='/' element={<PageLogin /> }></Route>}
        <Route path='/login' element={<PageLogin />}></Route>
        <Route path='/signup' element={<PageSignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/resetpassword' element={<ResetPassword />}></Route>

        <Route path='/schedules' element={<Schedules/>}></Route>
        <Route path='/todolist' element={<TodoList/>}></Route>
        <Route path='/groups' element={<Groups/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/settings' element={<Settings/>}></Route>
      </Routes>
    </div>
  );
}
