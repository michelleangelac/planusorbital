import React, { useState, useEffect } from "react";
import { Avatar, Card, Divider, IconButton, LinearProgress, Button } from "@mui/material";
import { CircularProgress, Typography } from "@mui/material";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import Box from '@mui/material/Box';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { db, firebaseAuth } from "../../hooks/useAuth";
import { doc, collection, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import TaskPrj from "./TaskProject";
import Popup from "../../components/Popup";
import PopupSch from "../Schedules/Popup";
import PopupPrj from "./Popup";

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

async function getTasks(user, prop) {
    //console.log(prop);
    const q = query(collection(db, "tasks"), where("user", "==", user.email), where("isCompleted", "==", false), where("project", "==", prop));
    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    } catch (e) {
      console.log(e);
    }
}

export default function Project(props) {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [name, setName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [completed, setCompleted] = useState(false);
    const [progress, setProgress] = useState(progress);
    const [id, setID] = useState("");

    const [isOpen, setIsOpen] = useState(false); 

    const [isModifyOpen, setIsModifyOpen] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    const togglePopup = (event) => {
        setName(event.name);
        setGroupName(event.groupName);
        setMembers(event.members);
        setStartDate(event.startDate);
        setEndDate(event.endDate);
        setID(event.id);
        setIsOpen(!isOpen);
        setIsModifyOpen(false);
        setIsDeleteOpen(false);
    }

    const toggleModifyPopup = (event) => {
        setIsOpen(false);
        setIsModifyOpen(!isModifyOpen);
        setIsDeleteOpen(false);
    }
    
    const toggleDeletePopup = (event) => {
        setIsOpen(false);
        setIsModifyOpen(false);
        setIsDeleteOpen(!isDeleteOpen);
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    function handleSave() {
        var user = firebaseAuth.currentUser;
        updateDoc(doc(db, "projects", id), { name: name, groupName: groupName, members: members, startDate: startDate, endDate: endDate, isCompleted: completed, progress: progress })
        .then(() => props.setProjects([]))
        .then(() => {
          getProject(user)
            .then(userData => userData.forEach(x => props.setProjects(prev => [...prev, {startDate: handleDateChange(userData.startDate), 
                endDate: handleDateChange(userData.endDate), isCompleted: userData.isCompleted, progress: userData.progress, id: x.id}])))
            // .then(console.log(events))
            .catch(err => console.log(err.message));
        });
        setIsOpen(true);
        setIsModifyOpen(false);
        setIsDeleteOpen(false);
        //setOpenSb(true);
        //handleSbText("Modified");
    }
    
    function handleDelete() {
        var user = firebaseAuth.currentUser;
        deleteDoc(doc(db, "projects", id))
        .then(() => props.setProjects([]))
        .then(() => {
          getProject(user)
            .then(userData => userData.forEach(x => props.setProjects(prev => [...prev, {startDate: handleDateChange(userData.startDate), 
                endDate: handleDateChange(userData.endDate), isCompleted: x.get("isCompleted"), progress: x.get("progress"), id: x.id}])))
            // .then(console.log(events))
            .catch(err => console.log(err.message));
        });
        setIsDeleteOpen(false);
        setIsOpen(false);
        setIsModifyOpen(false);
    }
    
    function LinearProgressWithLabel() {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={projects.progress} color="inherit"/>
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="black">
                        {`${Math.round(projects.progress)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    function handleDateChange(prop) {
        const timestamp = new Date(prop.seconds * 1000 + prop.nanoseconds / 1000000);
        return timestamp;
    }

    function displayDate(prop) {
        const dateArray = String(prop).split(" ");
        return dateArray[1] + " " + dateArray[2] + ", " + dateArray[3];
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setProjects([]);
                    getProject(user, props.id)
                        .then(userData => setProjects({name: userData.name, groupName: userData.groupName, members: userData.members, startDate: handleDateChange(userData.startDate), 
                        endDate: handleDateChange(userData.endDate), isCompleted: userData.isCompleted, progress: userData.progress})).catch(err => console.log(err));
                setTasks([]);
                    getTasks(user, projects.name).then(userData => userData.forEach(x => setTasks(prev => [...prev, x.id]))).catch(err => console.log(err));
            } else {
                navigate("/login");
            }
        });
    }, [])

    function CircularProgressWithLabel() {
        return (
            <Box sx={{ position: 'relative', display: 'flex' }}>
                <CircularProgress variant="determinate" value={projects.progress} style={{ color: "#A6A6A6" }} />
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
                        {`${Math.round(projects.progress)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div style={{ marginTop: '2%' }}>
            <Card style={{ width: '70%', margin: 'auto' }}>
                <div style={{ float: 'right', padding: '2% 5% 0 0', color: '#6978b5' }}>
                    <CircularProgressWithLabel />
                </div>
                <div className="prj-deadline">
                    Due Date: { displayDate(projects.endDate) } 
                </div>
                <div 
                    style={{ fontFamily: 'Inter', fontWeight: 600, textAlign: 'left', marginLeft: '3%' }}>
                    { projects.name }
                </div>
                <Divider style={{ margin: '2% 0 1% 0' }}/>
                <div>
                    <Avatar alt={ projects.groupName } src="/static/images/avatar/1.jpg" sx={{ width: '4vh', height: '4vh', float: 'left', margin: '0.5% 0 1% 3%' }}/>
                    <IconButton onClick={togglePopup} style={{ fontSize: '100%', float: 'right', marginRight: '5%' }}>
                        <IoIcons.IoIosArrowForward/>
                    </IconButton>
                </div>
                <div 
                    style={{ fontFamily: 'Inter', fontWeight: 600, textAlign: 'left', margin: '2% 0 3% 11%' }}>
                    { projects.groupName }
                </div>
            </Card>
            {isOpen && <PopupPrj
              content={
                <div>
                    <div>
                        <IconButton onClick={toggleDeletePopup} style={{ color: 'black', fontSize: '1.4em', float: 'right', margin: '1% 2% 0 0' }}>
                        <MdIcons.MdOutlineDelete style={{ fontSize: '1.2em' }}/>
                        </IconButton>
                        <IconButton onClick={toggleModifyPopup} style={{ color: 'black', fontSize: '1.4em', float: 'right', margin: '1% 2% 0 0' }}>
                        <FaIcons.FaRegEdit style={{ fontSize: '1.1em' }}/>
                        </IconButton>
                        {/*<IconButton style={{ color: 'black', fontSize: '1.4em', float: 'right', marginRight: '1%' }}>
                        <FaIcons.FaUserPlus />
                        </IconButton>*/}
                    </div>
                    <div 
                        style={{ 
                            textAlign: 'left', 
                            fontFamily: 'Inter', 
                            fontSize: '1.3em', 
                            fontWeight: 600,
                            margin: '5% 0 0 5%' 
                        }}>
                        { projects.name }
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: '5%', fontFamily: 'Inter' }}>
                        { projects.groupName + " (" + projects.members + ")" }
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: '5%', fontFamily: 'Inter' }}>
                        Start Date: { displayDate(projects.startDate) }
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: '5%', fontFamily: 'Inter' }}>
                        Due Date: { displayDate(projects.endDate) }
                    </div>
                    <div style={{ margin: '3% 0 3% 0' }}>
                        <LinearProgressWithLabel/>
                    </div>
                    <div className="container-content">
                        <div className="personal-tasks">
                            <div style={{ fontSize: '1.2em', fontFamily: 'Inter', fontWeight: 600 }}>My Tasks</div>
                                { tasks.map(x => <TaskPrj id={ x } setTasks={setTasks} />) }
                            </div>
                        <div className="group-tasks">
                            <div className="vl-prj"></div>
                            <div style={{ fontSize: '1.2em', fontFamily: 'Inter', fontWeight: 600 }}>Group Tasks</div>
                                { tasks.map(x => <TaskPrj id={ x } setTasks={setTasks} />) }
                            </div>
                        </div>
                </div>
              }
              handleClose={togglePopup}
            />}
            {isModifyOpen && <PopupSch
                content={
                    <div>
                        <b style={{ fontSize: '2em', fontFamily: 'Inter' }}>Modify a project</b>
                        <form>
                            <div 
                                style={{  
                                    textAlign: 'left',
                                    margin: '2% 0  0 10%',
                                    fontSize: '1.15em', 
                                    fontFamily: 'Inter', 
                                    fontWeight: 600, 
                                }}>
                                <label>Project Name</label>
                            </div>
                            <div>
                                <input 
                                    defaultValue={projects.name}
                                    value={name} 
                                    onChange={(event) => setName(event.target.value)} 
                                    className="prj-name" 
                                    type="text"/>
                            </div>
                            <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                <label>Group Name</label>
                            </div>
                            <div>
                                <input
                                    defaultValue={projects.groupName}
                                    value={groupName} 
                                    onChange={(event) => setGroupName(event.target.value)}
                                    className="prj-name" 
                                    type="text"/>
                            </div>
                            <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                <label>Members</label>
                            </div>
                            <div>
                                <input
                                    defaultValue={projects.members}
                                    value={members} 
                                    onChange={(event) => setMembers(event.target.value)}
                                    className="prj-members" 
                                    type="text"/>
                            </div>
                            <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                <label>Start Date</label>
                            </div>
                            <div>
                                <DatePicker
                                    className="prj-date"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="MMMM d, yyyy"/>
                            </div>
                            <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                                <label>Due Date</label>
                            </div>
                            <div>
                                <DatePicker
                                    className="prj-date"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="MMMM d, yyyy"/>
                            </div>
                        </form>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            style={{ margin: '3% 0 70% 0', width: '75%', backgroundColor: '#000000' }}>
                            Save
                        </Button>
                    </div>
                }
                handleClose={toggleModifyPopup}
            />}
            {isDeleteOpen && <Popup
                content={
                    <>
                        <b style={{ fontSize: '1.6em', fontFamily: 'Inter' }}>Delete a project</b>
                        <div style={{ textAlign: 'center', marginTop: '3%' }}>Are you sure you want to delete this project?</div>
                        <div>
                            <Button 
                                variant="contained"
                                onClick={toggleDeletePopup}
                                style={{ margin: '7% 0 0 0', backgroundColor: '#A9A9A9', borderRadius: '2px' }}>
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
    );
}