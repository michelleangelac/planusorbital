import React, { useState, useEffect } from "react";
import { Paper, Box } from "@mui/material";
import { db, firebaseAuth } from "../../hooks/useAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function getTask(user, id) {
    const q = query(collection(db, "tasks"), where("__name__", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      console.log("itu", querySnapshot.docs[0].data());
      return querySnapshot.docs[0].data();
    } catch (e) {
      console.log(e);
    }
}

export default function TaskPrj(props) {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setTasks([]);
                getTask(user, props.id).then(userData => setTasks({name: userData.name, project: userData.project, members: userData.members, status: userData.status, isCompleted: userData.isCompleted, progress: userData.progress}))
                    .catch(err => console.log(err));
            } else {
                navigate("/login");
            }
        });
    }, [])

    return (
        <div className="task-paper">
            <Box
                sx={{ display: 'flex', '& > :not(style)': { m: 1, width: '90%' } }}>
                <Paper style={{ backgroundColor: '#F5F5F5' }}>
                    <div className="task-name" style={{ marginLeft: '5%' }}>
                        <div style={{ verticalAlign: 'middle', margin: '3% 0 3% 0' }}>
                            { tasks.name }
                        </div>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}