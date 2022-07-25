import React, { useState, useEffect } from "react";
import { Button, Card, IconButton, LinearProgress, Box, Typography } from "@mui/material";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Tabs from "../../components/Sidebar/Tabs";
import Project from "./Project";
import PopupSch from "../Schedules/Popup";
import MemberList from "./Member";

import "./Projects.css"
import "@fontsource/inter";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Email, SettingsSystemDaydreamRounded } from "@mui/icons-material";

const initialState = {
  name: "",
  members: [],
  startDate: new Date(),
  endDate: new Date(),
  isCompleted: false,
  progress: 0
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

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [values2, setValues2] = useState(initialState);
  
  const [userExists, setUserExists] = useState(false);

  const [isSameUser, setIsSameUser] = useState(false);
  
  const [members, setMembers] = useState([]);

  const [currentMemberAdded, setCurrentMemberAdded] = useState("");

  const [message, setMessage] = useState("");

  const [add, setAdd] = useState(false);

  const [num, setNum] = useState(0);

  function togglePopupOpen() {
    var user = firebaseAuth.currentUser;
    setValues2(initialState);
    if (!members.includes(user.email)) {
      setMembers(prev => [...prev, user.email]);
    }
    setIsOpen(!isOpen);
  }

  function togglePopupClose() {
    setValues2(initialState);
    setIsOpen(!isOpen);
    setMembers([]);
    setMessage("");
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
  };

  function handleConfirm() {
    //setOpenSb(true);
    var user = firebaseAuth.currentUser;
    //console.log(user);
    addDoc(collection(db, "projects"), { user: user.email, name: values2.name, members: members, startDate: startDate, endDate: endDate, progress: 0 });
    setProjects([]);
    getProjects(user).then(userData => userData.forEach(x => setProjects(prev => [...prev, x.id]))).catch(err => console.log(err));
    togglePopupClose();
  }

  function handleAdd() {
    console.log(currentMemberAdded.toString());
    if (members.includes(currentMemberAdded)) {
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

  // function handleAdd1() {
  //   handleAdd()
  //   .then(() => ;
  //   // console.log(isSameUser);
  //   // setMessage(isSameUser ? "User is already a member!" : (userExists ? "User added successfully!" : "User not found!"));
  // }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // setProjects([]);
        if (projects.length == 0) {
          getProjects(user)
          .then(userData => userData.forEach(x => {
              setProjects(prev => [...prev, x.id]);
          }))
          .catch(err => console.log(err));
        }
        if (!members.includes(user.email)) {
          setMembers(prev => [...prev, user.email]);
        }
        console.log("members", members);
        console.log(add);
        console.log(isSameUser);
        console.log(num);
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
  }, [add, currentMemberAdded])

  console.log(projects);

  return (
    <div className="container-prj">
      <div className="sidebar-prj">
        <Tabs/>
      </div>
      <div className="title-prj">Projects</div>
      <div className="ongoing-prj">
        <div className="vl-pr"></div>
        <div className="prj-list-title">Ongoing Projects</div>
        <div style={{ marginLeft: '5%' }}>
          { projects.map(x => <Project id={ x } setProjects={setProjects} />) }
        </div>
        <Button className="add-project"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={togglePopupOpen}>
          Add project
        </Button>
        {isOpen && <PopupSch
            content={
              <>
                <b style={{ fontSize: '2em', fontFamily: 'Inter' }}>Add a project</b>
                <form>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Project Name</label>
                  </div>
                  <div>
                    <input className="prj-name" type="text" value={values2.name} onChange={handleChange("name")}></input>
                  </div>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Members</label>
                  </div>
                  <div>
                    <input className="prj-members" type="text" value={currentMemberAdded} onChange={(event) => setCurrentMemberAdded(event.target.value)}></input>
                    <div className="right" style={{display: 'inline-flex'}}>
                      <Button
                        variant="contained"
                        onClick={() => handleAdd()}
                        style={{ margin: '3% 0 3% 0', width: '75%', backgroundColor: '#000000', height: '6.5vh'}}>
                        Add
                      </Button>
                    </div>
                    <div>{message}</div>
                    <div style={{ marginLeft: '5%' }}>
                    {members.map(x => <MemberList email={x} setMembers = {setMembers}/>)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Start Date</label>
                  </div>
                  <div>
                    <DatePicker
                      className="prj-date"
                      selected={startDate}
                      onChange={(date) => {setStartDate(date), handleChange("startDate")}}
                      dateFormat="MMMM d, yyyy"/>
                  </div>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                      <label>Due Date</label>
                  </div>
                  <div>
                    <DatePicker
                      className="prj-date"
                      selected={endDate}
                      onChange={(date) => {setEndDate(date), handleChange("endDate")}}
                      dateFormat="MMMM d, yyyy"/>
                  </div>
                </form>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    style={{ margin: '3% 0 70% 0', width: '75%', backgroundColor: '#000000' }}>
                    Confirm
                </Button>
              </>
            }
            handleClose={togglePopupClose}
          />}
      </div>
      <div className="completed-prj">
        <div className="prj-list-title">Completed Projects</div>
        <div style={{ marginLeft: '5%' }}>
          { projects.map(x => <Project id={ x } setProjects={setProjects} />) }
        </div>
      </div>
    </div>
  );
}

export default Projects;