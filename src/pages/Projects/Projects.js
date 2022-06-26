import React, { useState } from "react";
import { Button, Chip } from "@mui/material";
import * as IoIcons from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Tabs from "../../components/Sidebar/Tabs";
import Project from "./Project";
import PopupSch from "../Schedules/Popup";

import "./Projects.css"
import "@fontsource/inter";

function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  {/*const [values, setValues] = useState({
    name: "",
    members: [],
    startDate: "",
    endDate: "",
  });*/}

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="container-prj">
      <div className="sidebar-prj">
        <Tabs/>
      </div>
      <div className="title-prj">Projects</div>
      <div className="projects-list">
        <div className="prj-list-title">Ongoing Projects</div>
        <div style={{ marginLeft: '5%' }}>
          <Project/>
        </div>
        <Button className="add-project"
          startIcon={<IoIcons.IoIosAdd />}
          onClick={togglePopup}>
          Add project
        </Button>
        {isOpen && <PopupSch
            content={
              <>
                <b style={{ fontSize: '2em' }}>Add a project</b>
                <form>
                  <div style={{ textAlign: 'left', margin: '3% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Project Name</label>
                  </div>
                  <div>
                    <input className="prj-name" type="text"></input>
                  </div>
                  <div style={{ textAlign: 'left', margin: '3% 0  0 10%', fontSize: '1.15em', fontFamily: 'Inter', fontWeight: 600 }}>
                    <label>Members</label>
                  </div>
                  <div>
                    <input className="prj-members" type="text">{/*chip for each member*/}</input>
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
                    style={{ margin: '3% 0 50% 0', width: '75%', backgroundColor: '#000000' }}>
                    Confirm
                </Button>
              </>
            }
            handleClose={togglePopup}
          />}
      </div>
      <div className="content-prj"></div>
    </div>
  )
}

export default Projects;