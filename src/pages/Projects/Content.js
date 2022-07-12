import React, { useState } from "react";
import { Card, IconButton, Popover, Button } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Tabs from "../../components/Sidebar/Tabs";
import Project from "./Project";
import PopupPrj from "./Popup";
import Popup from "../../components/Popup";
import Task from "../TodoList/Task";

import "./Projects.css"
import "@fontsource/inter";

export default function Content() {
    const navigate = useNavigate();

    function navigateBack() {
        return navigate("/projects");
    };

    const [popover, setPopover] = React.useState(null);
    function handleClick(event) {
      return setPopover(event.currentTarget);
    };
    const handleClose = () => {
      setPopover(null);
    };
    const open = Boolean(popover);
    const id = open ? 'simple-popover' : undefined;

    const [isModifyOpen, setIsModifyOpen] = useState(false);
 
    const toggleModifyPopup = () => {
      setIsModifyOpen(!isModifyOpen);
    }

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
    const toggleDeletePopup = () => {
      setIsDeleteOpen(!isDeleteOpen);
    }

    const [isProgressOpen, setIsProgressOpen] = useState(false);
 
    const toggleProgressPopup = () => {
      setIsProgressOpen(!isProgressOpen);
    }

    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '0.8em',
        width: 'auto',
        textAlign: 'center',
        backgroundColor: '#2B2B2B',
        color: '#FFFFFF',
        fontWeight: '600',
        fontFamily: [
          'Inter',
        ].join(','),
        '&:hover': {
          backgroundColor: '#A9A9A9',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#A9A9A9'
        }
      });  

    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'flex' }}>
                <CircularProgress variant="determinate" value={50} /*{...props}*/ />
                <Box
                    color="inherit"
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
    
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="caption" component="div" sx={{ color: 'black' }}>
                        {`${50/*Math.round(props.value)*/}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div className="container-prj">
            <div className="sidebar-prj">
                <Tabs/>
            </div>
            <div className="title-prj">Projects</div>
            <div className="projects-list">
                <div className="prj-list-title">Ongoing Projects</div>
                <div style={{ marginLeft: '5%' }}>
                    <Project/>
                </div>
            </div>
            <div className="content-prj">
                <Card style={{ width: '90%', marginTop: '4%' }}>
                    <div>
                        <IconButton onClick={navigateBack} style={{ color: 'black', fontSize: '1.4em', float: 'right', marginRight: '2%' }}>
                            <AiIcons.AiOutlineClose />
                        </IconButton>
                        <IconButton onClick={handleClick} style={{ color: 'black', opacity: '80%', float: 'right', marginRight: '1%' }}>
                            <CgIcons.CgMore />
                        </IconButton>
                        {/*<IconButton style={{ color: 'black', fontSize: '1.4em', float: 'right', marginRight: '1%' }}>
                            <FaIcons.FaUserPlus />
                        </IconButton>*/}
                        <Popover id={id} open={open} anchorEl={popover} onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={toggleModifyPopup}>
                                        <ListItemText primary="Modify project" />
                                    </ListItemButton>
                                    {isModifyOpen && <PopupPrj
                                        content={
                                            <div>
                                                <b style={{ fontSize: '2em' }}>Modify a project</b>
                                                <form>
                                                    <div 
                                                        style={{ 
                                                            textAlign: 'left', 
                                                            marginTop: '3%', 
                                                            fontSize: '1.15em', 
                                                            fontFamily: 'Inter', 
                                                            fontWeight: 600, 
                                                        }}>
                                                        <label>Project Name</label>
                                                    </div>
                                                    <div>
                                                        <input className="prj-mod-name" type="text"></input>
                                                    </div>
                                                    <div style={{ textAlign: 'left', marginTop: '3%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                                        <label>Members</label>
                                                    </div>
                                                    <div>
                                                        <input className="prj-mod-members" type="text">{/*chip for each member*/}</input>
                                                    </div>
                                                    <div style={{ marginTop: '2%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                                        <label>Start Date</label>
                                                    </div>
                                                    <div>
                                                        <DatePicker
                                                        className="prj-mod-date"
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        dateFormat="MMMM d, yyyy"/>
                                                    </div>
                                                    <div style={{ marginTop: '2%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                                        <label>Due Date</label>
                                                    </div>
                                                    <div>
                                                        <DatePicker
                                                        className="prj-mod-date"
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        dateFormat="MMMM d, yyyy"/>
                                                    </div>
                                                </form>
                                                <Button
                                                    variant="contained"
                                                    style={{ margin: '3% 0 50% 3%', width: '75%', backgroundColor: '#000000' }}>
                                                    Save
                                                </Button>
                                            </div>
                                        }
                                        handleClose={toggleModifyPopup}
                                    />}
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={toggleDeletePopup}>
                                        <ListItemText primary="Delete project" />
                                    </ListItemButton>
                                    {isDeleteOpen && <Popup
                                        content={
                                            <>
                                                <b style={{ fontSize: '1.6em', marginLeft: '25%' }}>Delete a project</b>
                                                <div style={{ textAlign: 'center', marginTop: '3%' }}>Are you sure you want to delete this project?</div>
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
                                </ListItem>
                            </List>
                        </Popover>
                    </div>
                    <div 
                        style={{ 
                            textAlign: 'left', 
                            fontFamily: 'Inter', 
                            fontSize: '1.3em', 
                            fontWeight: 600,
                            margin: '5% 0 0 5%' 
                        }}>
                        Project Name
                    </div>
                    <div style={{ float: 'right', marginRight: '5%' }}>
                        <BootstrapButton onClick={toggleProgressPopup}>
                            View Project Progress
                        </BootstrapButton>
                        {isProgressOpen && <Popup
                            content={
                                <>
                                    <b style={{ fontSize: '1.6em' }}>Project Progress</b>
                                    <div style={{ color: '#6978b5', position: 'absolute', margin: '5% 0 0 38%' }}>
                                        <CircularProgressWithLabel/>
                                    </div>
                                    <div>
                                        <Button 
                                            variant="contained"
                                            style={{ margin: '35% 0 0 3%', backgroundColor: '#000000', borderRadius: '2px' }}>
                                            Update Progress
                                        </Button>                                        
                                    </div>
                                </>
                            }
                            handleClose={toggleProgressPopup}
                        />}
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: '5%', fontFamily: 'Inter' }}>Project Group</div>
                    <div style={{ textAlign: 'left', marginLeft: '5%', fontFamily: 'Inter' }}>Due Date: June 27, 2022</div>
                    <div className="container-content">
                        <div className="personal-tasks">
                            <div style={{ fontSize: '1.2em', fontFamily: 'Inter', fontWeight: 600 }}>My Tasks</div>
                            <Task/>
                        </div>
                        <div className="group-tasks">
                            <div className="vl-prj"></div>
                            <div style={{ fontSize: '1.2em', fontFamily: 'Inter', fontWeight: 600 }}>Group Tasks</div>
                            <Task/>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}