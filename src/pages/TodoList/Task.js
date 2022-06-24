import React from "react";
import * as GiIcons from "react-icons/gi";
import { Box } from "@mui/system";
import { useState } from "react";
import { Paper, IconButton, Button, TextField, Select, MenuItem, FormControl, Slider } from "@mui/material";

import Popup from "../../components/Popup";
import './TodoList.css';

function Task(props) {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [status, setStatus] = useState('');

    const handleChange = (event) => {
      setStatus(event.target.value);
    };
  
    return (
        <div className="task-paper">
            <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '90%',
              },
            }}
            >
                <Paper variant="outlined">
                    <div className="task-name">
                        <IconButton onClick={togglePopup} style={{ color: 'black' }}>
                            <GiIcons.GiCircle style={{ fontSize: '80%' }} />
                        </IconButton>
                        { props.name }
                        {isOpen && <Popup
                            content={
                                <>
                                    <b style={{ fontSize: '1.6em', marginLeft: '25%' }}>Modify a task</b>
                                    <div style={{ margin: '2% 0 1.5% 0' }}>
                                        <b 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '25%' 
                                            }}>
                                            Name
                                        </b>
                                        <TextField 
                                        defaultValue="Learn Java"
                                        style={{ color: '#A9A9A9', width: '25vh' }}
                                        variant="standard"/>
                                    </div>
                                    <div style={{ marginBottom: '1.5%' }}>
                                        <b 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '21%' 
                                            }}>
                                            Project
                                        </b>
                                        <TextField 
                                        defaultValue="Orbital"
                                        style={{ color: '#A9A9A9', width: '25vh' }}
                                        variant="standard"/>
                                    </div>              
                                    <div style={{ marginBottom: '1.5%' }}>
                                        <b 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '14%' 
                                            }}>
                                            Members
                                        </b>
                                        <TextField 
                                        defaultValue="Gwyneth"
                                        style={{ color: '#A9A9A9', width: '25vh' }}
                                        variant="standard"/>
                                    </div>
                                    <div style={{ marginBottom: '1.5%' }}>
                                        <b 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                marginRight: '20%',
                                                verticalAlign: 'auto' 
                                            }}>
                                            Status
                                        </b>
                                        <FormControl variant="standard" sx={{ m: 1, width: '25vh' }}>
                                            <Select
                                            value={status}
                                            onChange={handleChange}
                                            defaultValue={"Not Started"}
                                            >
                                            <MenuItem value={"Not Started"}>Not Started</MenuItem>
                                            <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                            <MenuItem value={"Completed"}>Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{ marginBottom: '1.5%' }}>
                                        <b 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '1%' 
                                            }}>
                                            Progress
                                        </b>
                                        <Slider
                                            sx={{ 
                                                width: '25vh', 
                                                verticalAlign: 'middle',
                                                color: '#A9A9A9'
                                            }} 
                                            defaultValue={50} 
                                            aria-label="Default" 
                                            valueLabelDisplay="auto"/>
                                    </div>
                                    <div>
                                        <Button 
                                        variant="contained"
                                        style={{ marginTop: '7%', width: '95%', backgroundColor: '#A9A9A9' }}>
                                        Confirm
                                        </Button>

                                        <Button 
                                        variant="contained"
                                        style={{ marginTop: '7%', width: '95%', backgroundColor: '#FF0000' }}>
                                        Delete
                                        </Button>
                                    </div>
                                </>
                            }
                            handleClose={togglePopup}
                        />}
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Task;