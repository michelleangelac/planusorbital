import React from "react";
import * as GiIcons from "react-icons/gi";
import { Box } from "@mui/system";
import { Paper, IconButton } from "@mui/material";
import TodoList from "./TodoList";

import './TodoList.css';

function Task() {
    return (
        <div className="task-paper">
            <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '70%',
                height: '2%',
              },
            }}
            >
                <Paper variant="outlined">
                    <div className="task-name">
                        <IconButton style={{ color: 'black' }}>
                            <GiIcons.GiCircle style={{ fontSize: '80%' }} />
                        </IconButton>
                        Watch A Business Proposal
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Task;