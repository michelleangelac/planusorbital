import "./Dashboard.css"
import "@fontsource/inter";
import 'react-calendar/dist/Calendar.css';

import Tabs from "../../components/Sidebar/Tabs";
import ReactCalendar from "../../components/CalendarWeekly";
//import TaskDb from "./TaskDashboard";
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
  
  var numOfObject = 0;
  var taskName = 'Learn Java'
  var taskStatus = 'Not Started';
  var boxColor = '';

  if (taskStatus == 'Not Started') {
      boxColor = '#E2534A';
  } else if (taskStatus == 'In Progress') {
      boxColor = '#FDFD67';
  } else {
      boxColor = '#5ACD65';
  }
  
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
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '90%',
                height: '38vh'
              },
            }}
          >
            <Paper variant="outlined">
              <div className="paper-text">
                Today's Tasks
              </div>
              <div className="hr"></div>
              <div className="paper-text2">
                {taskName}
                <Box
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    width: '22%',
                    backgroundColor: boxColor, 
                    borderRadius: '16px', 
                    textAlign: 'center',
                    float: 'right',
                    marginRight: '4%'
                }}
                >
                  <div>
                      {taskStatus}
                  </div>
                </Box>
              </div>
              <div className="hr"></div>

              <div className="paper-text2">
                Watch A Business Proposal
              </div>
              <div className="hr"></div>
            </Paper>
          </Box>
        </div>
      </div>
      <div className="schedules">
        <div className="calendar-text">Weekly Schedule</div>
        <div className="calendar-dsh">
          <ReactCalendar/>
        </div>
      </div>
      <div className="events">
        <div className="left-papers">
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '90%',
                height: '38vh',
              },
            }}
          >
            <Paper variant="outlined">
              <div className="paper-text">
                Today's Events
              </div>
              <div className="hr"></div>
              <div className="paper-text2" style={{ textAlign: 'center' }}>
                You don't have any event today.
              </div>
            </Paper>
          </Box>
        </div>
      </div>
      <div className="projects">
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: '90%',
              height: '38vh',
            },
          }}
        >
          <Paper variant="outlined">
            <div className="paper-text">
              Upcoming Projects
            </div>
            <div className="hr"></div>
            <div className="paper-text2">
              <strong>03/06/2022</strong> BT2102 Assignment 1
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default Dashboard;