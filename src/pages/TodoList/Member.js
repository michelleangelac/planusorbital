import React , { useState, useEffect }from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Box } from "@mui/system";
import { Chip, Avatar, Paper, IconButton, Button, TextField, Select, MenuItem, FormControl, Slider, Snackbar, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import Popup from "../../components/Popup";
//import TodoList from "./TodoList";
// import './TodoList.css';
// import './Projects.css'

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function getProfile(email) {
    const q = query(collection(db, "profile"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].data());
      return querySnapshot.docs[0].data();
    } catch (e) {
      console.log(e);
    }
}

function profilePicture(link, name){
    console.log(link);
    if(link) {
      return <Avatar src={ link } />;
    }
    return <Avatar {...stringAvatar(name)} />;
  }

function MemberList(props) {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [userEmail, setUserEmail] = useState("");

    function handleDelete() {
        props.setMembers(prev => prev.filter(x => x != props.email));
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                console.log(props.email);
                getProfile(props.email).then(userData => setProfile(profilePicture(userData.profile, userData.name)));
                setUserEmail(user.email);
            } else {
                navigate("/login");
            }
        });
    }, [])

    return (
        <div className='member-paper'>
            <Chip 
                avatar={profile}
                label={props.email}
                variant="outlined"
                deleteIcon={<DeleteIcon />}
                clickable="true"
                onDelete={handleDelete}
                style={{margin: '1%'}}
            />
        </div>
    )
}

export default MemberList;