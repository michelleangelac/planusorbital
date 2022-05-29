import { RssFeed } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { config as firebaseConfig } from "../config/firebase.js";
import { useNavigate } from 'react-router-dom'; 

// Code edited from https://usehooks.com/useAuth/ and
// https://firebase.google.com/docs/auth/web/start#add-initialize-sdk
// Not my original work.

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((err) => alert(err.message));
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((err) => alert(err.message));
  };

  const signout = () => {
    return signOut(firebaseAuth).then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(firebaseAuth, email).then(() => {
      return true;
    });
  };

  const confirmPasswordReset = (code, password) => {
    return confirmPasswordReset(firebaseAuth, code, password).then(() => {
      return true;
    });
  };

  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleAuthProvider)
    .catch((err) => alert(err.message));
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle
  };
}
