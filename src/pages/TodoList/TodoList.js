import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import * as CgIcons from "react-icons/cg";
import * as IoIcons from "react-icons/io";
import { MenuItem, Select, FormControl, Button, TextField, Slider, Snackbar, Alert } from "@mui/material";

import Tabs from "../../components/Sidebar/Tabs";
import Task from "./Task";
import Popup from "../../components/Popup";
import MemberList from "./Member";

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
  progress: 0,
  isCompleted: Boolean(),
  group: Boolean()
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

async function getProjects(user) {
  //console.log(user.email);
  const q = query(collection(db, "projects"), where("user", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

async function getProject(user, id) {
  const q = query(collection(db, "projects"), where("__name__", "==", id));
  try {
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

async function getUser(email) {
  console.log("email", email);
  const q = query(collection(db, "profile"), where("email", "==", email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

function TodoList() {

  var user = firebaseAuth.currentUser;
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [tasks2, setTasks2] = useState([]);

  const [tasks3, setTasks3] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useState("Not Started");  

  const [values2, setValues2] = useState(initialState);

  const [message, setMessage] = useState("");

  const [members, setMembers] = useState([]);

  const [project, setProject] = useState("");

  const [projects, setProjects] = useState([]);

  //console.log("ini", values2);

  const [progress, setProgress] = useState(progress);
  const handleSlider = (prop, prop2) => (event, newValue) => {
    var value = 0;
    if (prop2 == "Completed") {
      value = 100;
    } else if (prop2 == "In Progress")  {
      value = event.target.value;
    }
    setProgress(value);
    setValues2({ ...values2, [prop]: value });
  }

  const [completed, setCompleted] = useState(false);

  const [openSb, setOpenSb] = useState(false);
  const handleCloseSb = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSb(false);
  };

  function handleSbText(text) {
    return text;
  }
 
  function togglePopup(status1, comp1) {
    setValues2(initialState);
    setProject("");
    setMembers([]);
    setIsOpen(!isOpen);
    setStatus(status1);
    setCompleted(comp1);
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
    setOpenSb(true);
    handleSbText("Added");
    var user = firebaseAuth.currentUser;
    //console.log(user);
    if(values2.name == "") {
      alert("Please fill in the required fields!");
    } else {
      console.log("mem",members);
      addDoc(collection(db, "tasks"), { user: user.email, name: values2.name, project: project, members: members, status: status, isCompleted: completed, progress: values2.progress, group: members.length > 1 ? true : false });
    setTasks([]);
        getTasks(user, "Not Started").then(userData => userData.forEach(x => setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks2([]);
        getTasks(user, "In Progress").then(userData => userData.forEach(x => setTasks2(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks3([]);
        getTasks(user, "Completed").then(userData => userData.forEach(x => setTasks3(prev => [...prev, x.id]))).catch(err => console.log(err));
        togglePopup("Not Started");
    }
  }

  const handleChange = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
  };

  const handleSelectNew = (event) => {
    console.log("handleSelectNew", event.target.value);
    setProject(event.target.value);
    // setValues({...values, project: event.target.value});
    // getProject(user, event.target.value).then(userData => setProjectName(userData.name));
    getProject(user, event.target.value).then(userData => setMembers(userData.members));
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setTasks([]);
        getTasks(user, "Not Started").then(userData => userData.forEach(x => setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks2([]);
        getTasks(user, "In Progress").then(userData => userData.forEach(x => setTasks2(prev => [...prev, x.id]))).catch(err => console.log(err));
        setTasks3([]);
        getTasks(user, "Completed").then(userData => userData.forEach(x => setTasks3(prev => [...prev, x.id]))).catch(err => console.log(err));
        getProjects(user).then(userData => userData.forEach(x => setProjects(prev => [...prev, {id : x.id, name: x.get("name")} ])));
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
          {/* <IconButton style={{ color: 'black', opacity: '80%', marginLeft: '45%' }}>
            <CgIcons.CgMore />
          </IconButton> */}
          <div className="vl"></div>
        </div>
        { tasks.map(x => <Task id={ x } setTasks={setTasks} setTasks2={setTasks2} setTasks3={setTasks3}/>) }
        <Button 
          className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={() => togglePopup("Not Started", false)}>
          Add task
        </Button>
      </div>
      <div className="in-progress">
        <div className="ip-text"> 
          In Progress
          {/* <IconButton 
          style={{ color: 'black', opacity: '80%', marginLeft: '45%' }}>
            <CgIcons.CgMore />
          </IconButton> */}
          <div className="vl"></div>
        </div>
        { tasks2.map(x => <Task id={ x } setTasks={setTasks} setTasks2={setTasks2} setTasks3={setTasks3}/>) }
        <Button 
          className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={() => togglePopup("In Progress", false)}>
          Add task
        </Button>
        <Snackbar open={openSb} autoHideDuration={6000} onClose={handleCloseSb}>
          <Alert onClose={handleCloseSb} severity="success" sx={{ width: '100%' }}>
            Task Added
          </Alert>
        </Snackbar>
      </div>
      <div className="completed">
        <div className="completed-text"> 
          Completed
          {/* <IconButton 
          style={{ color: 'black', opacity: '80%', marginLeft: '45%' }}>
            <CgIcons.CgMore />
          </IconButton> */}
        </div>
        { tasks3.map(x => <Task id={ x } setTasks={setTasks} setTasks2={setTasks2} setTasks3={setTasks3}/>) }
        <Button className="add-task"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={() => togglePopup("Completed", true)}>
          Add task
        </Button>
        {isOpen && <Popup
          content={
            <>
              <b style={{ fontSize: '1.5em', fontFamily: 'Inter' }}>Add a task</b>
              <div>
                <TextField 
                  label="Name*"
                  style={{ color: '#A9A9A9' }}
                  value={values2.name}
                  onChange={handleChange("name")}
                  variant="standard"/>
              </div>
              <div style={{ marginBottom: '1.5%', marginTop: '5%' }}>
                                        <div 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '52%' 
                                            }}>
                                            Project
                                        </div>
                                        <FormControl variant="standard" sx={{ m: 1, width: '35vh' }}>
                                        <Select value={project} onChange={handleSelectNew}>
                                            {projects.map(x => <MenuItem value = {x.id}><>{x.name}</></MenuItem>)}
                                        </Select>
                                        </FormControl>
                                    </div>
                                      <div style={{ marginBottom: '1.5%' , marginTop: '5%' }}>
                                        <div
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '45%',
                                            }}>
                                            Members
                                        </div>
                                        </div>              
              <div>
              {(members).map(x => <MemberList email={x} setMembers={setMembers}/>)}
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
                  onChange={handleSlider("progress", status)} 
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