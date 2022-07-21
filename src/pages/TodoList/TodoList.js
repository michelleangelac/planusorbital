import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import { Button, TextField, Slider } from "@mui/material";

import Tabs from "../../components/Sidebar/Tabs";
import Task from "./Task";
import Popup from "../../components/Popup";

import './TodoList.css';
import "@fontsource/inter";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { SettingsSystemDaydreamRounded } from "@mui/icons-material";

const initialState = {
  name: "",
  project: "",
  members: [],
  progress: 0
}

async function getTasks(user, status) {
  //console.log(user.email);
  const q = query(collection(db, "tasks"), where("user", "==", user.email), where("status", "==", status));
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

  const [tasks2, setTasks2] = useState([]);

  const [tasks3, setTasks3] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useState("Not Started");  

  const [values2, setValues2] = useState(initialState);

  console.log("ini", values2);

  const [progress, setProgress] = useState(progress);
  const handleSlider = (prop) => (event, newValue) => {
    setProgress(newValue);
    setValues2({ ...values2, [prop]: event.target.value });
  }
 
  function togglePopup(status1) {
    setValues2(initialState);
    setIsOpen(!isOpen);
    setStatus(status1);
  }

  function setProgressValue(status2, progress2) {
    if (status2 == "Not Started") {
      return 0;
    } else if (status2 == "Completed") {
      return 100;
    } else {
      return progress2;
    }
  }

  function handleConfirm() {
    var user = firebaseAuth.currentUser;
    //console.log(user);
    addDoc(collection(db, "tasks"), { user: user.email, name: values2.name, project: values2.project, members: values2.members, status: status, isCompleted: false, progress: values2.progress });
    //useEffect();
    setTasks([]);
        getTasks(user, "Not Started").then(userData => userData.forEach(x => setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks2([]);
        getTasks(user, "In Progress").then(userData => userData.forEach(x => setTasks2(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks3([]);
        getTasks(user, "Completed").then(userData => userData.forEach(x => setTasks3(prev => [...prev, x.id]))).catch(err => console.log(err));
    togglePopup("Not Started");
  }

  const handleChange = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setTasks([]);
        getTasks(user, "Not Started").then(userData => userData.forEach(x => setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks2([]);
        getTasks(user, "In Progress").then(userData => userData.forEach(x => setTasks2(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks3([]);
        getTasks(user, "Completed").then(userData => userData.forEach(x => setTasks3(prev => [...prev, x.id]))).catch(err => console.log(err));
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
        { tasks.map(x => <Task id={ x } setTasks={setTasks} />) }
        <Button 
          className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={() => togglePopup("Not Started")}>
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
        { tasks2.map(x => <Task id={ x } setTasks={setTasks2}/>) }
        <Button 
          className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={() => togglePopup("In Progress")}>
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
        { tasks3.map(x => <Task id={ x } setTasks={setTasks3}/>) }
        <Button className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={() => togglePopup("Completed")}>
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
                  value={values2.name}
                  onChange={handleChange("name")}
                  variant="standard"/>
              </div>
              <div>
                <TextField 
                  label="Project"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  value={values2.project}
                  onChange={handleChange("project")}
                  variant="standard"/>
              </div>              
              <div>
                <TextField 
                  label="Members"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  value={values2.members}
                  onChange={handleChange("members")}
                  variant="standard"/>
              </div>
              <div>
                <div 
                  style={{ margin: '5% 47% 0 0', opacity: '80%', fontSize: '1.15em' }}>
                  Progress
                </div>
                <Slider
                  sx={{ 
                    width: '33.5vh', 
                    verticalAlign: 'middle',
                    color: '#A9A9A9',
                    marginRight: '25%'
                  }}
                  defaultValue={0} 
                  value={setProgressValue(status, values2.progress)}
                  onChange={handleSlider("progress")} 
                  valueLabelDisplay="auto"/>
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
          handleClose={() => togglePopup("Not Started")}
        />}
      </div>
    </div>
  );
}

export default TodoList;