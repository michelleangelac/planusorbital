import React from "react";
import { Box, Divider, Paper } from "@mui/material";

export default function ProjectDb() {
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
              <div><Divider/></div>
              <div className="paper-text2">
                <strong>03/06/2022</strong> BT2102 Assignment 1
              </div>
            </Paper>
          </Box>
        </>
    );
}