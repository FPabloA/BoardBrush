import { useState } from "react";
import "./popup.css"
function RegisterPopup({registerCallBack, toggleClose}){
    const [newUsername, setNewUsername] = useState("");
    const [newPass1, setNewPass1] = useState("");
    const [newPass2, setNewPass2] = useState("");

    const handleNewUserChange = (e) =>{
        const target = e.target;
        setNewUsername(target.value);
    }
    const handleNewPass1Change = (e) =>{
        const target = e.target;
        setNewPass1(target.value);
    }
    const handleNewPass2Change = (e) =>{
        const target = e.target;
        setNewPass2(target.value);
    }
    const handleCreateAcct = () =>{
        if(newPass1 === newPass2){
            registerCallBack(newUsername, newPass1);
            //go to next screen
        }
        //show error message
    }

    return(<>
    <div className="popup-bg-container">
        <div className="popup-content-box">
            <button className="popup-close-button" onClick={toggleClose}>x</button>
            <h1 className="host-header">Register Account</h1>
            <input className="popup-host-username"
            type="text"
            placeholder="Enter Username"
            value={newUsername}
            onChange={handleNewUserChange}
            ></input>

            <input className="popup-host-password"
            type="password"
            placeholder="Enter Password"
            value={newPass1}
            onChange={handleNewPass1Change}
            ></input>

            <input className="popup-host-password"
            type="password"
            placeholder="Enter Password"
            value={newPass1}
            onChange={handleNewPass2Change}
            ></input>

            <button className="popup-host-submit" onClick={handleCreateAcct}>Login</button>
        </div>
    </div>
    </>);
}

export default RegisterPopup;