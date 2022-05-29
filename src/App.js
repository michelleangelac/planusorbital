import "./styles.css";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PageLogin />}></Route>
        <Route path='/signup' element={<PageSignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
