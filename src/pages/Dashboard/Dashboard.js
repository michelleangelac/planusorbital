import "./Dashboard.css"
import "@fontsource/inter";
import 'react-calendar/dist/Calendar.css';

import TaskDb from "./TaskDashboard";
import NoTask from "./NoTask";
import ProjectDb from "./ProjectDb";
import NoProject from "./NoProject";

import Tabs from "../../components/Sidebar/Tabs";
import ReactCalendar from "../../components/CalendarWeekly";
import { db, firebaseAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDisplayName } from "@mui/utils";
import { Box, Paper } from "@mui/material";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

async function getName() {
  var user = firebaseAuth.currentUser;
  const q = query(collection(db, "profile"), where("email", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

function Dashboard() {
  const [name, setName] = useState("");
  var name2 = getName().then(userData => setName(userData.name)).catch(err => console.log(err));
  
  var numOfTasks = 0;
  var numOfProjects = 0;
  
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
                You have completed 3/5 of your tasks today.
              </div>
            </Paper>
          </Box>
        </div>
        <div className="left-papers">
          <NoTask/>
        </div>
      </div>
      <div className="projects">
        <div className="left-papers">
          <NoProject/>
        </div>
      </div>
      <div className="schedules">
        <div className="calendar-text">Weekly Schedule</div>
        <div className="calendar-dsh">
          <ReactCalendar/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;