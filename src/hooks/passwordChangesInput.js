import BootstrapInput from "../components/BootstrapInput";
import { useContext, createContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, firebaseAuth, useAuth } from "../hooks/useAuth";
import { getAuth, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function passwordChangesInput() {
    const navigate = useNavigate();
    
    const { signup } = useAuth();

    const { updatepassword } = useAuth();

    const handleSubmit = (password, confirmPassword, username, name, email, faculty) => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            navigate("/signup");
        } else if (username == "" || name == "" || email == "" || password == "") {
            alert("Please fill in the required fields.");
            navigate("/signup");
        } else {
            signup(email, confirmPassword);
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
              console.log(user);
              if (user) {
                setDoc(doc(db, "profile", email), { username: username, name: name, email: email, password: password, faculty: faculty, profile: "" });
                navigate("/dashboard");
              } else {
                navigate("#");
              }
            });
        }
        return true;
    };

    const reauthenticate = (currentPassword) => {
        var user = firebaseAuth.currentUser;
        console.log(user);
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        )
        return reauthenticateWithCredential(user, credential);
    }

    const handleSubmitReset = async (currentPassword, newPassword, confirmPassword, username, name, email, faculty) => {
        var user = firebaseAuth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        )
        try {
            await reauthenticateWithCredential(user, credential);
            if (newPassword != confirmPassword) {
                alert("Passwords don't match");
                navigate("#");
            } else if (newPassword == "" || confirmPassword == "") {
                alert("Please fill in the required fields.");
                navigate("#");
            } else {
                await updatepassword(newPassword);
            }
        } catch (err) {
            alert(err);
        }
    };

    return {
        handleSubmit,
        handleSubmitReset
    };
}