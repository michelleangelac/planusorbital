import React, { useState } from "react";
import { Avatar, Button, FormControl, InputLabel, TextField, Box, IconButton } from "@mui/material";
import * as IoIcons from "react-icons/io";

import Tabs from "../components/Sidebar/Tabs";
import Popup from "../components/Popup";
import BootstrapInput from "../components/BootstrapInput";
import "./Settings.css"

function Settings() {
  const [isPictureOpen, setIsPictureOpen] = useState(false);

  const togglePicturePopup = () => {
    setIsPictureOpen(!isPictureOpen);
  }

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const togglePasswordPopup = () => {
    setIsPasswordOpen(!isPasswordOpen);
  }

  return (
    <div className="container-set">
      <div className="sidebar-set">
        <Tabs/>
      </div>
      <div className="title-set">Settings</div>
      <div className="navbar-set">Account</div>
      <div className="profilepic-set">
        <Avatar className="picture-set"/>
        <IconButton className="changepic-btn" onClick={togglePicturePopup} disableRipple>
          <IoIcons.IoIosCamera/>
        </IconButton>
      </div>
      <div className="content-set">
      <div>
          <FormControl variant="standard" style={{ marginBottom: '5%' }}>
            <InputLabel shrink htmlFor="label-set">
              Username
            </InputLabel>
            <BootstrapInput id="textbox-set"/>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="label-set">
              Full Name
            </InputLabel>
            <BootstrapInput id="textbox-set"/>
          </FormControl>
          </div>
      </div>
      <div className="content2-set">
        <div>
          <FormControl variant="standard" style={{ marginBottom: '5%' }}>
            <InputLabel shrink htmlFor="label-set">
              Email Address
            </InputLabel>
            <BootstrapInput id="textbox-set"/>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="label-set">
              Faculty
            </InputLabel>
            <BootstrapInput id="textbox-set"/>
          </FormControl>
          </div>
      </div>
      <div className="save-btn">
        <div>
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#5062AD', width: '50vh' }}
            onClick={togglePasswordPopup}>
            Change Password
          </Button>
        </div>
        <div>
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#5062AD', width: '50vh', marginTop: '2%' }}>
            Save Changes
          </Button>
        </div>
        {/*Picture popup */}
        {isPictureOpen && <Popup
          content={
            <>
              <b style={{ fontSize: '1.5em' }}>Change Profile Picture</b>
              <div>Hello</div>
            </>
          }
          handleClose={togglePicturePopup}
        />}
        {/*Password popup */}
        {isPasswordOpen && <Popup
          content={
            <>
              <b style={{ fontSize: '1.5em' }}>Change Password</b>
              <div>
                <TextField 
                  label="Current Password"
                  type="password"
                  style={{ color: '#A9A9A9' }}
                  variant="standard"/>
              </div>
              <div>
                <TextField 
                  label="New Password"
                  type="password"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  variant="standard"/>
              </div>              
              <div>
                <TextField 
                  label="Confirm New Password"
                  type="password"
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  variant="standard"/>
              </div>
              <div>
                <Button 
                  variant="contained"
                  fullWidth 
                  style={{ marginTop: '7%', maxWidth: '75%', backgroundColor: '#A9A9A9' }}>
                  Confirm
                </Button>
              </div>
            </>
          }
          handleClose={togglePasswordPopup}
        />}
      </div>
    </div>
  )
}

export default Settings;