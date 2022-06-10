import "./Dashboard.css"
import Tabs from "../components/Sidebar/Tabs";

import { firebaseAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Paper, Checkbox, FormControlLabel, Typography, FormGroup } from "@mui/material";
import Calendar from 'short-react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
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
                Hi Gwyneth,
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