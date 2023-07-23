import React, { useEffect } from "react";
import { Divider } from "@mui/material";

import { db, firebaseAuth, useAuth } from "../../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function getProject(user, id) {
  const q = query(collection(db, "projects"), where("__name__", "==", id));
  try {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

export default function ProjectDb(props) {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    name: "",
    members: [],
    startDate: new Date(),
    endDate: new Date(),
    isCompleted: false,
    progress: 0
  });

  function handleDateChange(prop) {
    const timestamp = new Date(prop.seconds * 1000 + prop.nanoseconds / 1000000);
    return timestamp;
  }

  function displayDate(prop) {
    const dateArray = String(prop).split(" ");
    return dateArray[2] + " " + dateArray[1] + " " + dateArray[3];
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        getProject(user, props.id).then(userData => setValues({name: userData.name, members: userData.members, startDate: handleDateChange(userData.startDate), endDate: handleDateChange(userData.endDate), isCompleted: userData.isCompleted, progress: userData.progress })).catch(err => console.log(err));
      } else {
        navigate("/login");
      }
    });
  }, [])

  return (
    <>
      <div><Divider/></div>
      <div className="paper-text2">
        <strong>{ values.name }</strong> due on { displayDate(values.endDate) }
      </div>
    </>
  );
}