import React from "react";
import { Box, Paper } from "@mui/material";
import "./Dashboard.css"

export default function TaskDb() {
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
        <>
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
        </>
    )
}