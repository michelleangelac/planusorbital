import React from "react";
import IconButton from '@mui/material/IconButton';
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import { Button } from "@mui/material";

import Tabs from "../../components/Sidebar/Tabs";
import Task from "./Task";
import './TodoList.css';
import "@fontsource/inter";

function TodoList() {
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
          startIcon={<IoIcons.IoIosAdd />}>
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
          startIcon={<IoIcons.IoIosAdd />}>
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
          startIcon={<IoIcons.IoIosAdd />}>
          Add task
        </Button>
      </div>
    </div>
  )
}

export default TodoList;