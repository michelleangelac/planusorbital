import "./Pages.css"
import Tabs from "../components/DashboardTab/Tabs";
import { firebaseAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {

  return (
    <>
        <Tabs/>
        <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;