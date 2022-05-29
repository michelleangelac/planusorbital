import "./styles.css";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Routes>
        {user ? <Route path='/' element={<Dashboard /> }></Route> : <Route path='/' element={<PageLogin /> }></Route>}
        <Route path='/login' element={<PageLogin />}></Route>
        <Route path='/signup' element={<PageSignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
