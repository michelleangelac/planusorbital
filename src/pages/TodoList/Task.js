import React , { useState, useEffect }from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Box } from "@mui/system";
import { Paper, IconButton, Button, TextField, Select, MenuItem, FormControl, Slider } from "@mui/material";

import Popup from "../../components/Popup";
import './TodoList.css';

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

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

function Task(props) {
    const navigate = useNavigate();
    const [isModifyOpen, setIsModifyOpen] = useState(false);
 
    const toggleModifyPopup = () => {
        setOldValues({name: values.name, project: values.project, members: values.members, status: values.status, isCompleted: values.isCompleted});
        setIsModifyOpen(!isModifyOpen);
      }

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
    const toggleDeletePopup = () => {
      setIsDeleteOpen(!isDeleteOpen);
    }

    //const [status, setStatus] = useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const [values, setValues] = React.useState({
        name: "",
        project: "",
        members: [],
        status: "",
        isCompleted: false,
        progress: 0
    });

    const [oldValues, setOldValues] = React.useState({
        name: "",
        project: "",
        members: [],
        status: "",
        isCompleted: "",
        progress: 0
    });

    function handleConfirm() {
        var user = firebaseAuth.currentUser;
        //console.log(user);
        updateDoc(doc(db, "tasks", props.id), { name: values.name, project: values.project, members: values.members, status: values.status, isCompleted: values.isCompleted});
        toggleModifyPopup("Not Started");
        props.setTasks([]);
        }

      function handleDelete() {
        var user = firebaseAuth.currentUser;
        deleteDoc(doc(db, "tasks", props.id));
        toggleDeletePopup("Not Started");
        props.setTasks([]);
        }
        useEffect(() => {
            firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    getTask(user, props.id).then(userData => setValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted})).catch(err => console.log(err));
                    getTask(user, props.id).then(userData => setOldValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted})).catch(err => console.log(err));
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
                                                marginRight: '21%' 
                                            }}>
                                            Project
                                        </b>
                                        <TextField 
                                        value={values.project}
                                        onChange = { handleChange("project") }
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
                                        onChange = {handleChange("members")}
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
                                            value={values.status}
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
                                            value={values.progress}
                                            onChange={handleChange("progress")} 
                                            aria-label="Default" 
                                            valueLabelDisplay="auto"/>
                                    </div>
                                    <div>
                                        <Button 
                                        variant="contained"
                                        onClick={handleConfirm}
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