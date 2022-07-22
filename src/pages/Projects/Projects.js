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

import "./Projects.css"
import "@fontsource/inter";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SettingsSystemDaydreamRounded } from "@mui/icons-material";

const initialState = {
  name: "",
  groupName: "",
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

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [values2, setValues2] = useState(initialState);

  function togglePopup() {
    setValues2(initialState);
    setIsOpen(!isOpen);
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
    addDoc(collection(db, "projects"), { user: user.email, name: values2.name, groupName: values2.groupName, members: values2.members, startDate: startDate, endDate: endDate, progress: 0 });
    setProjects([]);
      getProjects(user).then(userData => userData.forEach(x => setProjects(prev => [...prev, x.id]))).catch(err => console.log(err));
    togglePopup();
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setProjects([]);
          getProjects(user).then(userData => userData.forEach(x => setProjects(prev => [...prev, x.id]))).catch(err => console.log(err));
      } else {
        navigate("/login");
      }
    });
  }, [])

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
          onClick={togglePopup}>
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
                    <label>Group Name</label>
                  </div>
                  <div>
                    <input className="prj-name" type="text" value={values2.groupName} onChange={handleChange("groupName")}></input>
                  </div>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Members</label>
                  </div>
                  <div>
                    <input className="prj-members" type="text" value={values2.members} onChange={handleChange("members")}></input>
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
            handleClose={togglePopup}
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