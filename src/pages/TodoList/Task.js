import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Box } from "@mui/system";
import { useState } from "react";
import { Paper, IconButton, Button, TextField, Select, MenuItem, FormControl, Slider } from "@mui/material";

import Popup from "../../components/Popup";
import './TodoList.css';

function Task(props) {
    const [isModifyOpen, setIsModifyOpen] = useState(false);
 
    const toggleModifyPopup = () => {
      setIsModifyOpen(!isModifyOpen);
    }

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
    const toggleDeletePopup = () => {
      setIsDeleteOpen(!isDeleteOpen);
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
                <Paper style={{ backgroundColor: '#F5F5F5' }}>
                    <div className="task-name" style={{ marginLeft: '5%' }}>
                        { props.name }
                        <IconButton onClick={toggleDeletePopup} style={{ color: 'black', float: 'right' }}>
                            <MdIcons.MdOutlineDelete style={{ fontSize: '90%', opacity: '75%' }} />
                        </IconButton>
                        <IconButton onClick={toggleModifyPopup} style={{ color: 'black', float: 'right' }}>
                            <FaIcons.FaRegEdit style={{ fontSize: '80%', opacity: '75%' }} />
                        </IconButton>
                        {isModifyOpen && <Popup
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
                                    </div>
                                </>
                            }
                            handleClose={toggleModifyPopup}
                        />}
                        {isDeleteOpen && <Popup
                            content={
                                <>
                                    <b style={{ fontSize: '1.6em', marginLeft: '25%' }}>Delete a task</b>
                                    <div style={{ textAlign: 'center', marginTop: '3%' }}>Are you sure you want to delete this task?</div>
                                    <div>
                                        <Button 
                                        variant="contained"
                                        onClick={toggleDeletePopup}
                                        style={{ margin: '7% 0 0 15%', backgroundColor: '#A9A9A9', borderRadius: '2px' }}>
                                        Cancel
                                        </Button>
                                        <Button 
                                        variant="contained"
                                        style={{ margin: '7% 0 0 5%', backgroundColor: '#E2534A', borderRadius: '2px' }}>
                                        Delete
                                        </Button>                                        
                                    </div>
                                </>
                            }
                            handleClose={toggleDeletePopup}
                        />}                    
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Task;