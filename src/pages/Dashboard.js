import "./Dashboard.css"
import Tabs from "../components/Sidebar/Tabs";
import { firebaseAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Paper, Checkbox, FormControlLabel, Typography, FormGroup } from "@mui/material";

function Dashboard() {
  var numOfObject = 0;

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
                width: 450,
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
          <Tabs/>

          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: 450,
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
                width: 450,
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;