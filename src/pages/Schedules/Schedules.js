import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

import Tabs from "../../components/Sidebar/Tabs";
import BigCalendar from "./Calendar";

import "./Schedules.css";
import "@fontsource/inter";

function Schedules() {
  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '1.2em',
    width: '70vh',
    margin: '3% 0 3% 0',
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
      <div className="title-sch">Schedules</div>
      <div className="calendar-sch">
        <BigCalendar/>
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
      </div>
    </div>
  )
}

export default Schedules;