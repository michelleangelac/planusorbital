import React, {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from "moment";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Avatar, IconButton, Switch, TextField } from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import PopupSch from "./Popup";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

async function getSchedules(user) {
  // var user = firebaseAuth.currentUser;
  //console.log(user.email);
  const q = query(collection(db, "schedules"), where("user", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  } catch (e) {
    console.log(e);
  }
}

// const events = [{ start: new Date(), end: new Date(), title: "special event" }];

function BigCalendar(props) {
  // const [events, setEvents] = useState([]);
  const [isEventOpen, setIsEventOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isModifyOpen, setIsModifyOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const [name, setName] = useState("");

  const [id, setID] = useState("");

  const [privacy, setPrivacy] = useState(false);

  const toggleCloseEventPopup = () => {
    setIsEventOpen(!isEventOpen);
    setIsModifyOpen(false);
    setIsDeleteOpen(false);
  }

  const toggleEventPopup = (event) => {
    setStartDate(event.start);
    setEndDate(event.end);
    setName(event.title);
    setID(event.id);
    setPrivacy(event.privacy);
    setIsEventOpen(!isEventOpen);
    setIsModifyOpen(false);
    setIsDeleteOpen(false);
  }

  const toggleModifyPopup = (event) => {
    setIsEventOpen(false);
    setIsModifyOpen(true);
    setIsDeleteOpen(false);
  }

  const toggleDeletePopup = (event) => {
    setIsEventOpen(false);
    setIsModifyOpen(false);
    setIsDeleteOpen(true);
  }

  function handleSave() {
    var user = firebaseAuth.currentUser;
    //console.log(user);
    updateDoc(doc(db, "schedules", id), { name: name, startDate: startDate, endDate: endDate, privacy: privacy})
    .then(() => props.setEvents([]))
    .then(() => {
      getSchedules(user)
        .then(userData => userData.forEach(x => props.setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
        // .then(console.log(events))
        .catch(err => console.log(err.message));
    });
    setIsEventOpen(true);
    setIsModifyOpen(false);
    setIsDeleteOpen(false);
  }

  function handleDelete() {
    var user = firebaseAuth.currentUser;
    deleteDoc(doc(db, "schedules", id))
    .then(() => props.setEvents([]))
    .then(() => {
      getSchedules(user)
        .then(userData => userData.forEach(x => props.setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
        // .then(console.log(events))
        .catch(err => console.log(err.message));
    });
    setIsDeleteOpen(false);
    setIsEventOpen(false);
    setIsModifyOpen(false);
  }

  function moveEvent(event) {
    var user = firebaseAuth.currentUser;
    console.log(event.event.id);
    updateDoc(doc(db, "schedules", event.event.id), {startDate: event.start, endDate: event.end})
    .then(() => props.setEvents([]))
    .then(() => {
      getSchedules(user)
        .then(userData => userData.forEach(x => props.setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
        // .then(console.log(events))
        .catch(err => console.log(err.message));
    });
    // props.setEvents([]);
    // getSchedules(user)
    //     .then(userData => userData.forEach(x => props.setEvents(prev => [...prev, {start: new Date((x.get("startDate").seconds * 1000) + (x.get("startDate").nanoseconds / 1000000)), end: new Date((x.get("endDate").seconds * 1000) + (x.get("endDate").nanoseconds / 1000000)), title: x.get("name"), privacy: x.get("privacy"), id: x.id}])))
    //     // .then(console.log(events))
    //     .catch(err => console.log(err.message));
  }

  // const [events, setEvents] = React.useState({...props.events});

  // useEffect(() => {
  //   firebaseAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setEvents()
  //     }
  //   })
  // })

  return (
    <><div className="App">
      <DragAndDropCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={props.events}
        localizer={localizer}
        onSelectEvent={event => toggleEventPopup(event)}
        onEventDrop={(event) => moveEvent(event)}
        onEventResize={(event) => moveEvent(event)}
        resizable
        selectable
        style={{ height: '60vh' }} />
    </div><div>
        {(isEventOpen || isModifyOpen || isDeleteOpen) && <PopupSch
          content=
          {<>
            {isEventOpen ? <b style={{ fontSize: '2em' }}>Details</b> : isModifyOpen ? <b style={{ fontSize: '2em' }}>Modify a schedule</b> : <b style={{ fontSize: '2em' }}>Delete a schedule</b>}
            <form>
              {isDeleteOpen ? <div></div> : 
              <div style={{ textAlign: 'left', margin: '3% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                <label>Schedule Name</label>
              </div>
              }
              {isModifyOpen ? 
              <div>
                <input className="event-name" type="text" placeholder="Schedule Name" value={name} onChange={(event) => setName(event.target.value)}></input>
              </div> : isEventOpen ?
              <div style={{ textAlign: 'left', margin: '0% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 300 }}>
                <label>{name}</label>
              </div> :
              <div>
              </div>
              }
              {isDeleteOpen ? <div></div> : 
              <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                <label>Start Date and Time</label>
              </div>
              }
              {isModifyOpen ? 
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
                  dateFormat="MMMM d, yyyy h:mm aa" />
              </div> : isEventOpen ?
              <div style={{ textAlign: 'left', margin: '0% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 300 }}>
                <label>{startDate.toString()}</label>
              </div> :
              <div></div>
              }
              {isDeleteOpen ? <div></div> :
                <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                <label>End Date and Time</label>
                </div>
              }
              {isModifyOpen ? 
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
                  dateFormat="MMMM d, yyyy h:mm aa" />
              </div> : isEventOpen ?
              <div style={{ textAlign: 'left', margin: '0% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 300 }}>
                <label>{endDate.toString()}</label>
              </div> :
              <div></div>
              } 
              {/*(bell) Remind me: select*/}
            </form>
            {isDeleteOpen ? <div></div> : 
              <div style={{ textAlign: 'left', margin: '2% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                <label>Privacy</label>
              </div>
            }
            {isModifyOpen ? 
            <div style={{ textAlign: 'right', margin: '2% 13% 0 0' }}>
              <FaIcons.FaUsers style={{ fontSize: '1.6em', verticalAlign: 'middle', position: 'relative', left: '9%' }} />
              <Switch color="default" onChange={(event) => setPrivacy(event.target.checked)} />
              <FaIcons.FaUserLock style={{ fontSize: '1.4em', verticalAlign: 'middle' }} />
            </div> : isEventOpen ?
            <div style={{ textAlign: 'left', margin: '0% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 300 }}>
                <label>{privacy.toString()}</label>
              </div> :
            <div></div>
            }
            {isDeleteOpen ? 
              <div style={{ textAlign: 'left', margin: '0% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 300 }}>
                <label>Are you sure you want to delete "{name}"?  </label>
              </div> : <div></div>}
            {isEventOpen ?
            <div>
            <Button variant="contained" style={{ margin: '3% 0 3% 0', width: '75%', backgroundColor: '#000000' }} onClick = {toggleModifyPopup}>
              Modify
            </Button>
            <Button variant="contained" style={{ margin: '3% 0 3% 0', width: '75%', backgroundColor: '#000000'}} onClick = {toggleDeletePopup}>
              Delete
            </Button></div> : isModifyOpen ? 
            <Button variant="contained" onClick={handleSave} style={{ margin: '3% 0 3% 0', width: '75%', backgroundColor: '#000000' }}>
              Save
            </Button> :
            <Button variant="contained" onClick = {handleDelete} style={{ margin: '3% 0 3% 0', width: '75%', backgroundColor: '#000000' }}>
              Confirm Delete
            </Button>
            }
          </>}
          handleClose={toggleCloseEventPopup} />}
      </div></>
  );
}

export default BigCalendar;