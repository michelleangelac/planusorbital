import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import "./Tabs.css";

import { Avatar } from '@mui/material';
import { useAuth } from "../../hooks/useAuth";

function Tabs() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { signout } = useAuth();

  return (
    <>
    <IconContext.Provider value={{ color:'black' }}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars value={{ color: '#5062AD' }} onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          <li className='profile-pic'>
            <Link to="#" className='profile'>
              <Avatar sx={{ bgcolor: '#D0D4EB', width: 53, height: 53 }}>GG</Avatar>
            </Link>
          </li>
          <li className='profile-name'>
            <p>gwynethguo</p>
          </li>
          <li className='dashboard'>
            <Link to='/dashboard'>
              <AiIcons.AiOutlineHome/>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className='icon'>
            <Link to='/schedules'>
              <BsIcons.BsCalendar4Week/>
              <span>Schedules</span>
            </Link>
          </li>
          <li className='icon'>
            <Link to='/todolist'>
              <BsIcons.BsPencilSquare/>
              <span>To-do List</span>
            </Link>
          </li>
          <li className='icon'>
            <Link to='/groups'>
              <BsIcons.BsChatLeftText/>
              <span>Groups</span>
            </Link>
          </li>
          <li className='icon'>
            <Link to='/projects'>
              <AiIcons.AiOutlineFile/>
              <span>Projects</span>
            </Link>
          </li>
          <li className='icon'>
            <Link to='/settings'>
              <AiIcons.AiOutlineSetting/>
              <span>Settings</span>
            </Link>
          </li>
          <li className='icon' onClick={signout}>
            <Link to='/login'>
              <BiIcons.BiLogOut/>
              <span>Log Out</span>
            </Link>
          </li>
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  );
}

export default Tabs;