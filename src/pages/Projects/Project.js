import React from "react";
import { Avatar, AvatarGroup, Card, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import Box from '@mui/material/Box';

export default function Project() {
    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'flex' }}>
                <CircularProgress variant="determinate" value={50} /*{...props}*/ />
                <Box
                    color="inherit"
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
    
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="caption" component="div" sx={{ color: 'black' }}>
                        {`${50/*Math.round(props.value)*/}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div style={{ marginTop: '2%' }}>
            <Link to='/content' style={{ textDecoration: 'none' }}>
                <Card style={{ width: '90%' }}>
                    <div style={{ float: 'right', padding: '4% 5% 0 0', color: '#6978b5' }}>
                        <CircularProgressWithLabel />
                    </div>
                    <div className="prj-deadline">Due Date: June 30, 2022</div>
                        <div 
                            style={{ fontFamily: 'Inter', fontSize: '1.2em', fontWeight: 600, textAlign: 'left', marginLeft: '3%' }}>
                            BT2102 Assignment 1
                        </div>
                        <Divider style={{ margin: '5% 0 2% 0' }}/>
                        <div>
                            <AvatarGroup style={{ float: 'left', margin: '0.5% 0 1% 3%' }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: '5vh', height: '5vh' }}/>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: '5vh', height: '5vh' }}/>
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" sx={{ width: '5vh', height: '5vh' }}/>
                            </AvatarGroup>
                        </div>
                        <div 
                            style={{ 
                                fontFamily: 'Inter', 
                                fontWeight: 600, 
                                margin: '4.5% 29% 3% 0' 
                            }}>
                            Project Group Name
                        </div>
                </Card>
            </Link>
        </div>
    );
}