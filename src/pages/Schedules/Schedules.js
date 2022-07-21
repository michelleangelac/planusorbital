import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Avatar, IconButton, Switch, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";

import Tabs from "../../components/Sidebar/Tabs";
import BigCalendar from "./Calendar";
import PopupSch from "./Popup";

import './Schedules.css';
import "@fontsource/inter";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

async function getSchedules(user) {
  //console.log(user.email);
  const q = query(collection(db, "schedules"), where("user", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

function Schedules() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [events, setEvents] = useState([]);
 
  const toggleAddPopup = () => {
    setIsAddOpen(!isAddOpen);
  }

  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));

  const [endDate, setEndDate] = useState(setHours(setMinutes(new Date(), 30), 16));

  const [name, setName] = useState("");

  const [privacy, setPrivacy] = useState(false);

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '1em',
    width: '55vh',
    lineHeight: '1.1',
    backgroundColor: '#8E99CD',
    fontWeight: '600',
    fontFamily: [
      'Inter',
    ].join(','),
    '&:hover': {
      backgroundColor: '#8E99CD',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#000000'
    }
  });

  function handleSave() {
    var user = firebaseAuth.currentUser;
    //console.log(user);
    addDoc(collection(db, "schedules"), { user: user.email, name: name, startDate: startDate, endDate: endDate, privacy: privacy});
    setEvents([]);
    getSchedules(user)
        .then(userData => userData.forEach(x => setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
        // .then(console.log(events))
        .catch(err => console.log(err.message));
    toggleAddPopup();
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        setEvents([]);
        getSchedules(user)
        .then(userData => userData.forEach(x => setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
        // .then(console.log(events))
        .catch(err => console.log(err.message));  
      } else {
        navigate("/login");
      }
    });
  }, [])

  return (
    <div className="container-sch">
      <div className="sidebar-sch">
        <div className="tabs">
          <Tabs/>
        </div>
        {/*<div className="icon">
          <AiIcons.AiOutlineHome/>
        </div>*/}
      </div>
      <div className="title-sch">Schedules</div>
      <div className="calendar-sch">
        <div className="big-calendar">
          <BigCalendar events = { events } setEvents={setEvents}/>
        </div>
      </div>
      <div className="nusmods-btn">
        <BootstrapButton 
          variant="contained"
          style={{ backgroundColor: '#5062AD' }}
          startIcon={
            <Avatar
              sx={{ width: '26px', height: '26px' }} 
              src={'https://i.im.ge/2022/06/14/rvIPHT.png'
              }
            />
          }
        >
          Import Schedules from NUSMods
        </BootstrapButton>
        <div>
          <IconButton onClick={toggleAddPopup} style={{ fontSize: '3.5em', color: '#5062AD', marginLeft: '70%' }}>
            <MdIcons.MdOutlineAddCircle/>
          </IconButton>
          {isAddOpen && <PopupSch
            content={
              <>
                <b style={{ fontSize: '2em' }}>Add a schedule</b>
                <form>
                  <div style={{ textAlign: 'left', margin: '3% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Schedule Name</label>
                  </div>
                  <div>
                    <input className="event-name" type="text" placeholder="Schedule Name" value={name} onChange={(event) => setName(event.target.value)}></input>
                  </div>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Start Date and Time</label>
                  </div>
                  <div>
                    <DatePicker
                      className="event-start-date"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      injectTimes={[
                        setHours(setMinutes(new Date(), 1), 0),
                        setHours(setMinutes(new Date(), 5), 12),
                        setHours(setMinutes(new Date(), 59), 23),
                      ]}
                      dateFormat="MMMM d, yyyy h:mm aa"/>
                  </div>
                  <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                      <label>End Date and Time</label>
                  </div>
                  <div>
                      <DatePicker
                        className="event-end-date"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        injectTimes={[
                          setHours(setMinutes(new Date(), 1), 0),
                          setHours(setMinutes(new Date(), 5), 12),
                          setHours(setMinutes(new Date(), 59), 23),
                        ]}
                        dateFormat="MMMM d, yyyy h:mm aa"/>
                  </div>
                  {/*(bell) Remind me: select*/}
                </form>
                <div style={{ textAlign: 'right', margin: '2% 13% 0 0' }}>
                  <FaIcons.FaUsers style={{ fontSize: '1.6em', verticalAlign: 'middle', position: 'relative', left: '9%'  }}/>
                  <Switch color="default" onChange={(event) => setPrivacy(event.target.checked)}/>
                  <FaIcons.FaUserLock style={{ fontSize: '1.4em', verticalAlign: 'middle' }}/>
                </div>
                <Button
                    variant="contained"
                    style={{ margin: '3% 0 50% 0', width: '75%', backgroundColor: '#000000' }}
                    onClick={handleSave}>
                    Save
                </Button>
              </>
            }
            handleClose={toggleAddPopup}
          />}
        </div>
      </div>
    </div>
  )
}

export default Schedules;