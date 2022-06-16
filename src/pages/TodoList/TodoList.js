import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import { Button, TextField } from "@mui/material";

import Tabs from "../../components/Sidebar/Tabs";
import Task from "./Task";
import Popup from "../../components/Popup";

import './TodoList.css';
import "@fontsource/inter";

function TodoList() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="container">
      <div className="sidebar">
        <Tabs/>
      </div>
      <div className="title">To-do List</div>
      <div className="not-started">
        <div className="ns-text">
          Not Started 
          <IconButton style={{ color: 'black', opacity: '80%', marginLeft: '45%' }}>
            <CgIcons.CgMore />
          </IconButton>
          <div className="vl"></div>
        </div>
        <Task />
        <Button 
          className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={togglePopup}>
          Add task
        </Button>
      </div>
      <div className="in-progress">
        <div className="ip-text"> 
          In Progress
          <IconButton 
          style={{ color: 'black', opacity: '80%', marginLeft: '45%' }}>
            <CgIcons.CgMore />
          </IconButton>
          <div className="vl"></div>
        </div>
        <Button 
          className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={togglePopup}>
          Add task
        </Button>
      </div>
      <div className="completed">
        <div className="completed-text"> 
          Completed
          <IconButton 
          style={{ color: 'black', opacity: '80%', marginLeft: '45%' }}>
            <CgIcons.CgMore />
          </IconButton>
        </div>
        <Button className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={togglePopup}>
          Add task
        </Button>
        {isOpen && <Popup
          content={
            <>
              <b style={{ fontSize: '1.5em' }}>Add a task</b>
              <div>
                <TextField 
                  label="Name*"
                  style={{ color: '#A9A9A9' }}
                  variant="standard"/>
              </div>
              <div>
                <TextField 
                  label="Project"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  variant="standard"/>
              </div>              
              <div>
                <TextField 
                  label="Members"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  variant="standard"/>
              </div>
              <div>
                <Button 
                  variant="contained"
                  fullWidth 
                  style={{ marginTop: '7%', maxWidth: '75%', backgroundColor: '#A9A9A9' }}>
                  Confirm
                </Button>
              </div>
            </>
          }
          handleClose={togglePopup}
        />}
      </div>
    </div>
  )
}

export default TodoList;