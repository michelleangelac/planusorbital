import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Button, styled } from "@material-ui/core";
import { firebaseAuth, useAuth, db } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import logo from "../assets/images/logo.svg";
import show from "../assets/images/show.png";
import hide from "../assets/images/hide.png";
import google from "../assets/images/google.png";

const onKeyDown = (event) => {
  if (event.keyCode === 13) event.preventDefault();
};

const Input = ({ label, id, name, type, value, onChange }) => {
  return (
    <div className="flex flex-col w-full items-left mb-7">
      <label
        htmlFor={id}
        className="font-sans text-[16px] text-grey -mt-1 w-full ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="border border-grey rounded-xl w-full h-12 px-3 py-2"
        required
      ></input>
    </div>
  );
};

const PasswordInput = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onClick,
  showInput,
}) => {
  return (
    <div className="flex flex-col w-[100%] items-left">
      <label
        htmlFor={id}
        className="font-sans text-[16px] text-grey -mt-1 w-full ml-1"
      >
        {label}
      </label>
      <div className="flex justify-center items-center mb-4 relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="border border-grey rounded-xl w-full h-12 pl-3 pr-12 py-2"
          required
        ></input>
        <button
          className="absolute right-0 ml-1 mr-3 px-1 items-center"
          type="button"
          onClick={onClick}
        >
          {showInput ? (
            <img className="w-6" src={hide} />
          ) : (
            <img className="w-6" src={show} />
          )}
        </button>
      </div>
    </div>
  );
};

function PageLogin() {
  const navigate = useNavigate();
  const googleAuthProvider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginWithGoogle = async (event) => {
    event.preventDefault();
    console.log("handleGoogle");
    await signInWithPopup(auth, googleAuthProvider)
      .then((resp) => {
        console.log("HERE", "");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-w-screen min-h-screen">
      <div className="w-[100%] md:w-[65%] min-h-[50%] md:min-h-[100%] bg-gradient-to-b from-purple to-lavender p-[8%]">
        <div className="flex flex-col bg-white/[.15] min-w-[100%] min-h-[100%] p-[6%] justify-center">
          <img className="mb-[3%] w-[40%] md:w-[30%]" src={logo} />
          <div className="text-[30px] md:text-[50px] font-bold text-white mb-[3%]">
            Plan your individual & group tasks efficiently.
          </div>
          <div className="text-[12px] md:text-[16px] font-semibold text-white">
            “A goal without a plan is just a wish.” Antoine de Saint-Exupéry
          </div>
        </div>
      </div>
      <div className="flex flex-col grow justify-center items-stretch p-[15%] md:p-[7%]">
        <div className="text-[20px] md:text-[29px] font-extrabold mb-8 text-center">
          Login to your account.
        </div>
        <form className="input-form" onSubmit={handleLogin}>
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          ></Input>
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            onClick={togglePassword}
            showInput={showPassword ? 1 : 0}
          ></PasswordInput>
          <div className="flex justify-end -mt-1">
            <a className="font-bold text-[13px] text-hyperlink" href="#">
              Forgot password?
            </a>
          </div>
          <button
            className="bg-lavender w-full font-bold text-[20px] text-white py-2 rounded-xl my-7"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex justify-stretch items-center">
          <div className="border border-grey/50 h-0 w-[45%]" />
          <div className="text-grey text-[13px] mx-3">or</div>
          <div className="border border-grey/50 h-0 w-[45%]" />
        </div>
        <button
          className="border border-grey w-full font-semibold text-[16px] py-2 rounded-xl my-7"
          type="submit"
          onClick={handleLoginWithGoogle}
        >
          <div className="flex justify-center items-center">
            <img className="w-7 mx-2" src={google} />
            Continue with Google
          </div>
        </button>
        <div className="flex justify-center">
          <div className="text-[13px]">
            Not registered yet?{" "}
            <a className="font-bold text-hyperlink" href="#">
              Create an account.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
