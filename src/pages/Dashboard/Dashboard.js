import "./Dashboard.css"
import "@fontsource/inter";
import 'react-calendar/dist/Calendar.css';

import TaskDb from "./TaskDashboard";
import NoTask from "./NoTask";
import ProjectDb from "./ProjectDb";
import NoProject from "./NoProject";

import Tabs from "../../components/Sidebar/Tabs";
import AgendaCalendar from "./Calendar";
import { db, firebaseAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDisplayName } from "@mui/utils";
import { Box, Paper } from "@mui/material";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { TakeoutDiningSharp } from "@mui/icons-material";

async function getName(user) {
  console.log("Dashboard", user);
  const q = query(collection(db, "profile"), where("email", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

async function getUncompletedTasks(user) {
  //console.log(user.email);
  const q = query(collection(db, "tasks"), where("user", "==", user.email), where("isCompleted", "==", false));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

async function getTasks(user) {
  //console.log(user.email);
  const q = query(collection(db, "tasks"), where("user", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

async function getSchedules(user) {
  //console.log(user.email);
  const q = query(collection(db, "schedules"), where("user", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

function Dashboard() {
  var numOfProjects = 1;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  
  const [tasks, setTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [numOfTasks, setNumOfTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        getName(user)
        .then(userData => setName(userData.name))
        .catch(err => console.log(err));

        setUncompletedTasks([]);
        setNumOfTasks(0);
        getUncompletedTasks(user)
        .then(userData => userData.forEach(x => {
          setUncompletedTasks(prev => [...prev, x.id]);
          setNumOfTasks(numOfTasks => numOfTasks + 1);
        }))
        // .then(() => console.log(uncompletedTasks.length))
        .catch(err => console.log(err));

        setTasks([]);
        setTotalTasks(0);
        getTasks(user)
        .then(userData => userData.forEach(x => {
          setTasks(prev => [...prev, x.id]);
          setTotalTasks(totalTasks => totalTasks + 1);
        }))

        setEvents([]);
        getSchedules(user)
        .then(userData => userData.forEach(x => setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
        // .then(console.log(events))
        .catch(err => console.log(err.message)); 

        // console.log(uncompletedTasks);
      } else {
        navigate("/login");
      }
    });
  }, [])
  
  return (
    <div className="container-dsh">
      <div className="sidebar-dsh">
        <Tabs/>
      </div>
      <div className="tasks">
        <div className="tasks-count">
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '90%'
              },
            }}
          >
            <Paper variant="outlined">
              <div className="tasks-text">
                Hi { name },
              </div>
              <div className="tasks-text2">
                You have completed { totalTasks - numOfTasks }/{totalTasks} of your tasks.
              </div>
            </Paper>
          </Box>
        </div>
        <div className="left-papers">
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '90%',
                height: 'auto'
              },
            }}
          >
          <Paper variant="outlined">
              <div className="paper-text">
                Uncompleted Tasks
              </div>
              {numOfTasks > 0 ? uncompletedTasks.map(x => <TaskDb id={x} setTasks={setTasks} />) : <NoTask/>}
            </Paper>
          </Box>
        </div>
      </div>
      <div className="projects">
        <div className="left-papers">
          {numOfProjects > 0 ? <ProjectDb/> : <NoProject/>}
        </div>
      </div>
      <div className="schedules">
        <div className="calendar-text">Monthly Schedule</div>
        <div className="calendar-dsh">
          <AgendaCalendar events = {events}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;