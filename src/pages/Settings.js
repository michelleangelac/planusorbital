import React, { useState, useEffect } from "react";
import { Avatar, Button, FormControl, InputLabel, TextField, Box, IconButton } from "@mui/material";
import * as IoIcons from "react-icons/io";

import Tabs from "../components/Sidebar/Tabs";
import Popup from "../components/Popup";
import BootstrapInput from "../components/BootstrapInput";
import "./Settings.css";

import { db, firebaseAuth, useAuth } from "../hooks/useAuth";
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updatePassword, updateProfile } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { SettingsSystemDaydreamRounded } from "@mui/icons-material";
import passwordChangesInput from "../hooks/passwordChangesInput";

import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import Resizer from "react-image-file-resizer";

async function getData(user) {
  // console.log("Dashboard", user);
  const q = query(collection(db, "profile"), where("email", "==", user.email));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (e) {
    console.log(e);
  }
}

async function handleConvertURL(file) {
  const reader = new FileReader();
  reader.onloadend = () => {
    setValues({newProfile: reader.result});
  }

  const url = await reader.readAsDataURL(file);
  console.log(url);
  return url;
}

function Settings() {
  const navigate = useNavigate();

  const [image, setImage] = useState("");

  const [progress, setProgress] = useState(null);

  const [uploadingImage, setUploadingImage] = useState(null);

  const [url, setUrl] = useState(null);

  const [urlPopUp, setUrlPopUp] = useState(null);

  const { handleSubmitReset } = passwordChangesInput();

  const [isPictureOpen, setIsPictureOpen] = useState(false);

  const [changesSaved, setChangesSaved] = useState("");

  const [profilePic, setProfilePic] = useState(null);

  // const [pfp, setPfp] = useState(<Avatar style={{ margin: 'auto', width: '20vh', height: '20vh' }} {...stringAvatar(values.name)} />)

  const [values, setValues] = React.useState({
    username: "",
    email:"",
    name:"",
    faculty:"",
    profile:"",
    newProfile:""
  });

  const [values2, setValues2] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const togglePicturePopup = () => {
    setIsPictureOpen(!isPictureOpen);
  }

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const togglePasswordPopup = () => {
    setIsPasswordOpen(!isPasswordOpen);
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange2 = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
  };

  function handleSave() {
    var user = firebaseAuth.currentUser;
    console.log(user);
    updateDoc(doc(db, "profile", user.email), { username: values.username, email: values.email, name: values.name, faculty: values.faculty});
    setValues({ username: values.username, email: values.email, name: values.name, faculty: values.faculty});
    setChangesSaved("Changes have been saved successfully!");
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
    console.log(link);
    if(link) {
      return <Avatar style={{ margin: 'auto', width: '20vh', height: '20vh' }} src={ link } />;
    }
    return <Avatar style={{ margin: 'auto', width: '20vh', height: '20vh' }} {...stringAvatar(name)} />;
  }

  function handleProfile() {
    return values.name ? profilePicture(values.profile, values.name) : <Avatar style={{ margin: 'auto', width: '20vh', height: '20vh' }}/>;
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const imageResized = await resizeFile(file);
      var myImage = new Image();
      // fetch(imageResized).then((response) => {
      //   myImage.src = response;
      // });

      const getBase64StringFromDataURL = (dataURL) =>
      dataURL.replace('data:', '').replace(/^.+,/, '');

      fetch(imageResized)
        .then((res) => res.blob())
        .then((blob) => {
          const storage = getStorage();
          const user = firebaseAuth.currentUser;
          const imageRef = ref(storage, user.email);
          const metadata = {
          contentType: 'image/jpeg',
          };
          console.log("INI", image);
          const uploadImage = uploadBytesResumable(imageRef, blob, metadata);
          uploadImage.on('state_changed',
            (snapshot) => {
              setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              alert(error.message);
            },
            () => {
              // console.log(image);
              getDownloadURL(uploadImage.snapshot.ref)
              .then((url) => {
                console.log(url);
                setUrl(url);
              });
              console.log("FINISH UPLOADING!");
            }
          );
        });
      // const blob = await base64Response.blob();
      // const finalFile = new File([blob], {type: blob.type});
      // myImage.src = finalFile; 
      // setImage(myImage);
      // console.log(image);
      // console.log(myImage);
      // console.log("ello", image);
      }
  }

  const handleSubmit = () => {
    var user = firebaseAuth.currentUser;
    updateDoc(doc(db, "profile", user.email), {profile: url}).catch(err => alert(err.message));
    setValues({profile: url});
    togglePicturePopup();
    setUrl("");
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        getData(user)
        .then(userData => {
          setValues({username: userData.username, email: userData.email, name: userData.name, faculty: userData.faculty, profile: userData.profile});
          setProfilePic(profilePicture(userData.profile, userData.name));
        })
        .catch((err) => console.log(err));
        console.log(values.profile);
      } else {
        navigate("/login");
      }
    });
  }, [])

  return (
    <div className="container-set">
      <div className="sidebar-set">
        <Tabs/>
      </div>
      <div className="title-set">Settings</div>
      <div className="navbar-set">Account</div>
      <div className="profilepic-set">
        { profilePic }
        <IconButton 
          className="changepic-btn"
          style={{ backgroundColor: '#5062AD' }} 
          onClick={togglePicturePopup} 
          disableRipple>
          <IoIcons.IoIosCamera/>
        </IconButton>
      </div>
      <div className="content-set">
      <div>
          <FormControl variant="standard" style={{ marginBottom: '5%' }}>
            <InputLabel shrink htmlFor="label-set">
              Username
            </InputLabel>
            <BootstrapInput id="textbox-set" value={values.username} onChange={handleChange("username")} style={{ width: '60vh' }}/>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="label-set">
              Full Name
            </InputLabel>
            <BootstrapInput id="textbox-set" value = { values.name } onChange = { handleChange("name") } style={{ width: '60vh' }}/>
          </FormControl>
          </div>
      </div>
      <div className="content2-set">
        <div>
          <FormControl variant="standard" style={{ marginBottom: '5%' }}>
            <InputLabel shrink htmlFor="label-set">
              Email Address
            </InputLabel>
            <BootstrapInput id="textbox-set" value = { values.email } onChange = { handleChange("email") } style={{ width: '60vh' }}/>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="label-set">
              Faculty
            </InputLabel>
            <BootstrapInput id="textbox-set" value = { values.faculty } onChange = { handleChange("faculty") } style={{ width: '60vh' }}/>
          </FormControl>
          </div>
      </div>
      <div className="save-btn">
        <div>
        {changesSaved}
        </div>
        <div>
          <Button 
            variant="contained" 
            onClick={handleSave}
            style={{ backgroundColor: '#5062AD', width: '43vh' }}>
            Save Changes
          </Button>
          {/*<Prompt
            when={handleSave}
            message='Changes saved.'  
          />*/}
        </div>
        <div>
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#5062AD', width: '43vh', marginTop: '1.5%' }}
            onClick={togglePasswordPopup}>
            Change Password
          </Button>
        </div>
        {/*Picture popup */}
        {isPictureOpen && <Popup
          content={
            <>
              <b style={{ fontSize: '1.5em' }}>Change Profile Picture</b>
              <img src = {url} alt="" />
              <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={handleImageChange}
              >
              <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Browse Files
              </Button>
              </label>
              </div>
              <Button variant="contained" onClick = {handleSubmit} color="primary" component="span">
                Upload
              </Button>
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
                  value={values2.currentPassword}
                  onChange={handleChange2("currentPassword")}
                  style={{ color: '#A9A9A9' }}
                  variant="standard"/>
              </div>
              <div>
                <TextField 
                  label="New Password"
                  type="password"
                  value={values2.newPassword}
                  onChange={handleChange2("newPassword")}
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  variant="standard"/>
              </div>              
              <div>
                <TextField 
                  label="Confirm New Password"
                  type="password"
                  value={values2.confirmPassword}
                  onChange={handleChange2("confirmPassword")}
                  style={{ color: '#A9A9A9', marginTop: '3%' }}
                  variant="standard"/>
              </div>
              <div>
                <Button 
                  variant="contained"
                  fullWidth 
                  onClick={() => handleSubmitReset(values2.currentPassword, values2.newPassword, values2.confirmPassword, values.username, values.name, values.email, values.faculty).then(() => setValues2({currentPassword:"", confirmPassword:"", newPassword:""}))}
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
