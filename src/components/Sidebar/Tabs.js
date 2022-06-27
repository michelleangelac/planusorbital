import React, {useState, useEffect} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import "./Tabs.css";

import { Avatar } from '@mui/material';
import { db, useAuth, firebaseAuth } from '../../hooks/useAuth'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

async function getData(user) {
  console.log(user);
  const q = query(collection(db, "profile"), where("email", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

var getInitials = function (string) {
  var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();
  
  if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

function stringAvatar(fullname) {
  return {
    sx: {
      bgcolor: '#D0D4EB',
      width: 100,
      height: 100,
    },
    children: getInitials(fullname),
  };
}

function profilePicture(link, name){
  if(link) {
    return <Avatar sx={{ width: 100, height: 100 }} src={ link } />;
  }
  return <Avatar {...stringAvatar(name)} />;
}

function Tabs() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { signout } = useAuth();

  const [name, setName] = useState("");
  var name3 = getData().then(userData => setName(userData.name)).catch(err => console.log(err));
  // console.log({ name });

  const [username, setUsername] = useState("");
  var name2 = getData().then(userData => setUsername(userData.username)).catch(err => console.log(err));
  // console.log(username);

  const [profile, setProfile] = useState("");
  var name1 = getData().then(userData => setProfile(userData.profile)).catch(err => console.log(err));

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        getData(user).then(userData => setName(userData.name)).catch(err => console.log(err));
        getData(user).then(userData => setUsername(userData.username)).catch(err => console.log(err));
        getData(user).then(userData => setProfile(userData.profile)).catch(err => console.log(err));
      } else {
        navigate("/login");
      }
    });
  }, [])

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
              { profilePicture(profile, name) }
            </Link>
          </li>
          <li className='profile-name'>
            <p>{ username }</p>
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