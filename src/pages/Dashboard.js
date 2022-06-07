import "./Pages.css"
import Tabs from "../components/DashboardTab/Tabs";
<<<<<<< Updated upstream
import { firebaseAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
=======
import { Box, Paper } from "@mui/material";
>>>>>>> Stashed changes

function Dashboard() {

  return (
    <>
      <Tabs/>
      <Box
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper className="tasks-paper" variant="outlined" elevation={1}>
          <div>
            Hi Gwyneth,
          </div>
          <div className="tasks-text">
            You have completed 3/5 of your tasks today.
          </div>
        </Paper>
      </Box>
    </>
  );
}

export default Dashboard;