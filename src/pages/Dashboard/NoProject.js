import React from "react";
import { Box, Paper } from "@mui/material";

export default function NoProject() {
    return (
        <>
            <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '90%',
                height: 'auto',
              },
            }}
          >
            <Paper variant="outlined">
              <div className="paper-text">
                Upcoming Projects
              </div>
              <div className="hr"></div>
              <div className="paper-text2" style={{ textAlign: 'center', margin: '2% 0 2% 0' }}>
                You don't have any upcoming projects.
              </div>
            </Paper>
          </Box>
        </>
    );
}
