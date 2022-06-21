import React from "react";
import { Box, Paper } from "@mui/material";

export default function NoTask() {
    return (
      <>
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
              Today's Tasks
            </div>
            <div className="hr"></div>
            <div className="paper-text2" style={{ textAlign: 'center', margin: '2% 0 2% 0' }}>
              You don't have any tasks left today.
            </div>
          </Paper>
        </Box>
      </>
    )
}