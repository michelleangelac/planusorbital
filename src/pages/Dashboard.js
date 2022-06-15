import "./Dashboard.css"
import Tabs from "../components/Sidebar/Tabs";
import { db, firebaseAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Checkbox, FormControlLabel, Typography, FormGroup } from "@mui/material";
import Calendar from 'short-react-calendar';
import 'react-calendar/dist/Calendar.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDisplayName } from "@mui/utils";
import React, {useState} from "react";  

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

  function ReactCalendar() {
    const [date, onChange] = useState(new Date());

    return (
      <div>
        <Calendar className='calendar' onChange={onChange} value={date} oneWeekCalendar={true}/>
      </div>
    );
  }

  return (
    <>
      <div className="background">
        <div className="side-icons">
          <Tabs/>

          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 500,
                height: 75,
              },
            }}
          >
            <Paper className="tasks-paper" variant="outlined">
              <div className="tasks-text">
                Hi { name },
              </div>
              <div className="tasks-text2">
                You have completed 3/5 of your tasks today.
              </div>
            </Paper>
          </Box>

          <div>
            <ReactCalendar />
          </div>

          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 500,
                height: 215,
              },
            }}
          >
            <Paper className="todos-paper" variant="outlined">
              <div className="general-text">
                Today's Tasks
              </div>
              <div className="hr"></div>
              <FormGroup className="checkboxes">
                <FormControlLabel
                  control={
                    <Checkbox className='checkbox'/>
                  }
                  label={<Typography className="general-text2">Learn Java</Typography> }
                />
                <div className="hr"></div>
                <FormControlLabel
                  control={
                    <Checkbox className='checkbox'/>
                  }
                  label={<Typography className="general-text2">Rewatch Math Lecture</Typography> }
                />
                <div className="hr"></div>
              </FormGroup>
            </Paper>
          </Box>

          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 500,
                height: 215,
              },
            }}
          >
            <Paper className="events-paper" variant="outlined">
              <div className="general-text">
                Today's Events
              </div>
              <div className="hr"></div>
              <div className="general-text2" style={{ textAlign: 'center', marginTop: '65px' }}>
                You don't have any event today.
              </div>
            </Paper>
          </Box>

          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 500,
                height: 215,
              },
            }}
          >
            <Paper className="projects-paper" variant="outlined">
              <div className="general-text">
                Upcoming Projects
              </div>
              <div className="hr"></div>
              <div className="general-text2" style={{ marginTop: '10px', marginLeft: '15px' }}>
                <strong>03/06/2022</strong> BT2102 Assignment 1
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Dashboard;