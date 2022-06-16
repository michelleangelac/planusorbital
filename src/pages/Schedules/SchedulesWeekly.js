import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

import ReactCalendar from "../../components/CalendarWeekly";
import Tabs from "../../components/Sidebar/Tabs";

import "./Schedules.css";
import "@fontsource/inter";

function SchedulesWeekly() {
  const navigate = useNavigate(); 
  const navigateMonthly = () => { 
    let path = '/schedules'; 
    navigate(path);
  }
  const navigateDaily = () => { 
    let path = '/sch-daily'; 
    navigate(path);
  }

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '1em',
    lineHeight: 1.5,
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
      <div className="navbar-sch">
        <BootstrapButton 
          className="monthly-btn" 
          variant="contained" 
          style={{ marginTop: '1.5%', borderRadius: '12px 0 0 12px' }}
          onClick={navigateMonthly}
          disableRipple>
          Monthly
        </BootstrapButton>
        <BootstrapButton 
          className="weekly-btn" 
          variant="contained" 
          style={{ marginTop: '1.5%', borderRadius: '0 0 0 0' }}
          disableRipple>
          Weekly
        </BootstrapButton>
        <BootstrapButton 
        className="daily-btn" 
        variant="contained" 
        style={{ marginTop: '1.5%', borderRadius: '12px 0 0 12px' }}
        onClick={ navigateDaily }
        disableRipple>
          <div className="daily-text">
            Daily
          </div>
        </BootstrapButton>
      </div>
      <div className="calendar-sch">
        <ReactCalendar/>
      </div>
      <div className="popup-sch">
        <h1>Popup</h1>
      </div>
      <div className="nusmods-btn">
        <Button 
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
        </Button>
      </div>
    </div>
  )
}

export default SchedulesWeekly;