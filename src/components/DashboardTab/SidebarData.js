import React, {useState} from 'react';
//import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
    {
        title:'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineHome/>,
        cName: 'nav-text'
    }, 
    {
        title:'Schedules',
        path: '/schedules',
        icon: <BsIcons.BsCalendar4Week/>,
        cName: 'nav-text'
    },
    {
        title:'To-do List',
        path: '/todolist',
        icon: <BsIcons.BsPencilSquare/>,
        cName: 'nav-text'
    }, 
    {
        title:'Groups',
        path: '/groups',
        icon: <BsIcons.BsChatLeftText/>,
        cName: 'nav-text'
    },
    {
        title:'Projects',
        path: '/projects',
        icon: <AiIcons.AiOutlineFile/>,
        cName: 'nav-text'
    }, 
    {
        title:'Settings',
        path: '/settings',
        icon: <AiIcons.AiOutlineSetting/>,
        cName: 'nav-text'
    },
    {
        title:'Log Out',
        path: '/login',
        icon: <BiIcons.BiLogOut/>,
        cName: 'nav-text'
    }
]