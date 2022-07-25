import React, {useState, useEffect} from "react";
import { Box, Paper } from "@mui/material";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

async function getTask(user, id) {
  //console.log(user.email);
  const q = query(collection(db, "tasks"), where("__name__", "==", id));
  try {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

export default function TaskDb(props) {
  const navigate = useNavigate();
    // var taskName = "hello";
    // console.log(taskName);
    // var taskStatus = props.status;
    var boxColor = '';

    const [values, setValues] = React.useState({
      name: "",
      project: "",
      members: [],
      status: "",
      isCompleted: false,
      progress: 0
  });

    if (values.status == 'Not Started') {
        boxColor = '#E2534A';
    } else if (values.status == 'In Progress') {
        boxColor = '#FDFD67';
    } else {
        boxColor = '#5ACD65';
    }

    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
          if (user) {
              getTask(user, props.id).then(userData => setValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
              // getTask(user, props.id).then(userData => setOldValues({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
          } else {
              navigate("/login");
          }
      });
  }, [])

    return (
        <>
        <div className="hr"></div>
          <div className="paper-text2">
                {values.name}
                <Box
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    width: '22%',
                    backgroundColor: boxColor, 
                    borderRadius: '16px', 
                    textAlign: 'center',
                    float: 'right',
                    marginRight: '4%'
                }}
                >
                  <div>
                      {values.status}
                  </div>
                </Box>
              </div>
              </>
    )
  }