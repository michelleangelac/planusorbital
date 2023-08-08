import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const config = {
  apiKey: "AIzaSyBnyldLcuB5k3rUhRNLqujJ9ZO5xMuqLGE",
  authDomain: "planus-c5393.firebaseapp.com",
  projectId: "planus-c5393",
  storageBucket: "planus-c5393.appspot.com",
  messagingSenderId: "1037326455331",
  appId: "1:1037326455331:web:8d757ad5d7de10ea5e9796",
  measurementId: "G-KJLK7PEYZX",
};

const app = initializeApp(config);
export const auth = getAuth(app);

export default app;
