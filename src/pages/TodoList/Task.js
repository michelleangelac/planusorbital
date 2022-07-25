import React , { useState, useEffect }from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Box } from "@mui/system";
import { Paper, IconButton, Button, TextField, Select, MenuItem, FormControl, Slider, Snackbar, Alert } from "@mui/material";

import Popup from "../../components/Popup";
//import TodoList from "./TodoList";
import './TodoList.css';
import MemberList from "./Member";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function getTask(user, id) {
    //console.log(user.email);
    const q = query(collection(db, "tasks"), where("__name__", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].data());
      return querySnapshot.docs[0].data();
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

  function Task(props) {
    const navigate = useNavigate();

    var user = firebaseAuth.currentUser;

    const [tasks, setTasks] = useState([]);

    const [message, setMessage] = useState("");

    const [projects, setProjects] = useState([]);

    const [project, setProject] = useState("");

    const [isModifyOpen, setIsModifyOpen] = useState(false);
 
    const toggleModifyPopup = () => {
        getTask(user, props.id).then(userData => setValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
                getTask(user, props.id).then(userData => setOldValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
        setIsModifyOpen(!isModifyOpen);
    }

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
    const toggleDeletePopup = () => {
      setIsDeleteOpen(!isDeleteOpen);
    }
    
    /*const [openSb, setOpenSb] = useState(false);
    const handleCloseSb = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSb(false);
    };

    function handleSbText(text) {
        return text;
    }*/

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [values, setValues] = React.useState({
        name: "",
        project: "",
        members: [],
        status: "",
        isCompleted: Boolean(),
        progress: 0
    });

    const [oldValues, setOldValues] = React.useState({
        name: "",
        project: "",
        members: [],
        status: "",
        isCompleted: Boolean(),
        progress: 0
    });

    function handleConfirm() {
        if (values.name == "") {
            alert("Please fill in the required fields!");
        } else {
        // setConfirm(true);
        var user = firebaseAuth.currentUser;
        //console.log(user);
        console.log(values.progress);
        // if (values.status == "Complete") {
        //     setValues({progress: 100});
        // } else if (values.status == "Not Started") {
        //     setValues({progress: 0});
        // }

        // if (values.progress == 0) {
        //     setValues({})
        // }
        updateDoc(doc(db, "tasks", props.id), { name: values.name, project: project, members: values.members, status: values.status, isCompleted: completed, progress: setProgressValue(values.status, values.progress)});
        setValues([]);
        setOldValues([]);
        props.setTasks([])
        getTasks(user, "Not Started").then(userData => userData.forEach(x => props.setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
        props.setTasks2([]);
        getTasks(user, "In Progress").then(userData => userData.forEach(x => props.setTasks2(prev => [...prev, x.id]))).catch(err => console.log(err));
        props.setTasks3([]);
        getTasks(user, "Completed").then(userData => userData.forEach(x => props.setTasks3(prev => [...prev, x.id]))).catch(err => console.log(err));
        toggleModifyPopup();
        //document.write(setOpenSb(true));
        //document.write(handleSbText("Modified"));
        // setConfirm(false);
        }
    }

    const [completed, setCompleted] = useState(false);

    const [status, setStatus] = useState(status);
    const handleSelect = (prop) => (event) => {
        console.log(event.target.value);
        setStatus(event.target.value);
        setValues({...values, status: event.target.value });
        if (event.target.value == "Completed") {
            setCompleted(true);
            // setValues({...values, isCompleted: true});
        } else {
            setCompleted(false);
            // setValues({...values, isCompleted: false});
        }
    }

    const [members, setMembers] = useState([]);

    const [projectName, setProjectName] = useState("");

    const handleSelectNew = (event) => {
        console.log("handleSelectNew", event.target.value);
        console.log("proj", project, projects, projectName)
        setProject(event.target.value);
        setValues({...values, project: event.target.value});
        getProject(user, event.target.value).then(userData => setProjectName(userData.name));
        getProject(user, event.target.value).then(userData => setMembers(userData.members));
    }

    const [progress, setProgress] = useState(progress);
    const handleSlider = (prop2, prop3) => (event) => {
        var value = event.target.value;
        console.log("slider", value, prop3);
        if (prop2 == "Not Started" || prop2 == "Completed") {
            value = prop3;
        }
        setProgress(value);
        setValues({...values, progress: value });
    }

    function setProgressValue(status2, progress2) {
        if (status2 == "Not Started") {
            return 0;
        } else if (status2 == "Completed") {
            return 100;
        } else if (progress2 == 0) {
            return progress2 + 1;
        } else if (progress2 == 100) {
            return progress2 - 1;
        } else {
            return progress2;
        }
    }

    async function getName(id) {
        var x = await getProject(user, id);
        console.log(x.name);
        return x.name;
    }
    
    function handleDelete() {
        var user = firebaseAuth.currentUser;
        deleteDoc(doc(db, "tasks", props.id));
        toggleDeletePopup("Not Started");
        setValues([]);
        setOldValues([]);
        props.setTasks([])
        getTasks(user, "Not Started").then(userData => userData.forEach(x => props.setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
        props.setTasks2([]);
        getTasks(user, "In Progress").then(userData => userData.forEach(x => props.setTasks2(prev => [...prev, x.id]))).catch(err => console.log(err));
        props.setTasks3([]);
        getTasks(user, "Completed").then(userData => userData.forEach(x => props.setTasks3(prev => [...prev, x.id]))).catch(err => console.log(err));
        toggleModifyPopup();
    }

    const [isSameUser, setIsSameUser] = useState(false);
    const [num, setNum] = useState(0);
    const [currentMemberAdded, setCurrentMemberAdded] = useState("");
    const [add, setAdd] = useState(false);
    function handleAdd() {
        console.log(currentMemberAdded.toString());
        console.log("members", members);
        console.log("project.members", projects.members);
        if ((members).includes(currentMemberAdded)) {
          console.log("bener");
          setIsSameUser(true);
          // console.log(isSameUser);
        }
        else {
          setIsSameUser(false);
          getUser(currentMemberAdded).then(userData => setNum(userData.length));
          getUser(currentMemberAdded.toString()).then(userData => userData.forEach(x => {
            // setNum(prev => prev+1);
            // console.log("ada dlm", ada);
            // handle kalo mem  ber udah ada di array
            // handle kalo user add user sendiri
            setMembers(prev => [...prev, x.get("email")]);
          }));
        }
        // console.log("ada", ada);
        // setCurrentMemberAdded("");  
        setAdd(true);
        // setIsSameUser(false);
        // setUserExists(false);
      }

        
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                console.log("rerender");
                setTasks([]);
                getTask(user, props.id).then(userData => setValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
                getTask(user, props.id).then(userData => setOldValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
                getTask(user, props.id).then(userData => setProject(userData.project));
                getTask(user, props.id).then(userData => setMembers(userData.members));
                setProjects([]);
                getProjects(user).then(userData => userData.forEach(x => setProjects(prev => [...prev, {id : x.id, name: x.get("name")}])));
                getUser(currentMemberAdded).then(userData => setNum(userData.length));
                    if (add) {
                      setMessage(isSameUser ? "User is already a member!" : ( num > 0 ? "User added successfully!" : "User not found!"));
                      setCurrentMemberAdded("");
                      setNum(0);
                      setIsSameUser(false);
                      setAdd(false);
                    }
            } else {
                navigate("/login");
            }
        });
    }, [])
    
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
                        <IconButton onClick={toggleDeletePopup} style={{ color: 'black', float: 'right' }}>
                            <MdIcons.MdOutlineDelete style={{ fontSize: '90%', opacity: '75%' }} />
                        </IconButton>
                        <IconButton onClick={toggleModifyPopup} style={{ color: 'black', float: 'right' }}>
                            <FaIcons.FaRegEdit style={{ fontSize: '80%', opacity: '75%' }} />
                        </IconButton>
                        <div style={{ paddingTop: '3%' }}>
                            { oldValues.name }
                        </div>
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
                                        value={ values.name }
                                        onChange = { handleChange("name") }
                                        style={{ color: '#A9A9A9', width: '25vh' }}
                                        variant="standard"/>
                                    </div>
                                    <div style={{ marginBottom: '1.5%' }}>
                                        <b 
                                            style={{ 
                                                fontSize: '1.2em', 
                                                verticalAlign: 'bottom',
                                                marginRight: '18%',
                                                width: '29vh' 
                                            }}>
                                            Project
                                        </b>
                                        <FormControl variant="standard" sx={{ m: 1, width: '25vh' }}>
                                        <Select value={project} onChange={handleSelectNew}>
                                            {projects.map(x => <MenuItem value = {x.id}><>{x.name}</></MenuItem>)}
                                        </Select>
                                        </FormControl>
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
                                        {/* <TextField 
                                        value={ currentMemberAdded }
                                        onChange = {(e) => setCurrentMemberAdded(e.target.value)}
                                        style={{ color: '#A9A9A9', width: '25vh' }}
                                        variant="standard"/> */}
                                        {/* <div className="right" style={{display: 'inline-flex'}}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAdd()}
                                        style={{ margin: '3% 0 3% 0', width: '75%', backgroundColor: '#000000', height: '4vh'}}>
                                        Add
                                    </Button>
                                    </div> */}
                                    <div>
                                    {message}
                                    {(members).map(x => <MemberList email={x} setMembers={setMembers}/>)}
                                    </div>
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
                                            <Select value={values.status} onChange={handleSelect(status)}>
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
                                            value={setProgressValue(values.status, values.progress)}
                                            onChange={handleSlider(values.status, setProgressValue(values.status, values.progress))} 
                                            valueLabelDisplay="auto"/>
                                    </div>
                                    <div>
                                        <Button 
                                        variant="contained"
                                        onClick={handleConfirm}
                                        style={{ marginTop: '7%', width: '95%', backgroundColor: '#000000' }}>
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
                                    <b style={{ fontSize: '1.6em', marginLeft: '25%', fontFamily: 'Inter' }}>Delete a task</b>
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
                                            onClick={handleDelete}
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