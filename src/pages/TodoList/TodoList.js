import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import { Button, TextField } from "@mui/material";

import Tabs from "../../components/Sidebar/Tabs";
import Task from "./Task";
import Popup from "../../components/Popup";

import './TodoList.css';
import "@fontsource/inter";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

async function getTasks(user) {
  //console.log(user.email);
  const q = query(collection(db, "tasks"), where("user", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

function TodoList() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [values, setValues] = React.useState({
    name: "",
    project: "",
    members: [],
  });

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  function handleConfirm() {
    var user = firebaseAuth.currentUser;
    //console.log(user);
    addDoc(collection(db, "tasks"), { user: user.email, name: values.name, project: values.project, members: values.members});
    //useEffect();
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setTasks([]);
        getTasks(user).then(userData => userData.forEach(x => setTasks(prev => [...prev, x.data().name]))).catch(err => console.log(err));
      } else {
        navigate("/login");
      }
    });
  }, [])

  console.log(tasks);

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
        { tasks.map(x => <Task name={ x } />) }
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
                  value={values.name}
                  onChange={handleChange("name")}
                  variant="standard"/>
              </div>
              <div>
                <TextField 
                  label="Project"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  value={values.project}
                  onChange={handleChange("project")}
                  variant="standard"/>
              </div>              
              <div>
                <TextField 
                  label="Members"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  value={values.members}
                  onChange={handleChange("members")}
                  variant="standard"/>
              </div>
              <div>
                <Button 
                  variant="contained" 
                  onClick={handleConfirm}
                  style={{ marginTop: '7%', width: '75%', backgroundColor: '#000000' }}>
                  Confirm
                </Button>
              </div>
            </>
          }
          handleClose={togglePopup}
        />}
      </div>
    </div>
  );
}

export default TodoList;