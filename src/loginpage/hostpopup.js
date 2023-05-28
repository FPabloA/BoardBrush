import { useState } from "react";
import "./popup.css"
function HostPopup({loginCallBack, toggleClose}){
    const [hostUsername, setHostUsername] = useState(null);
    const [hostPass, setHostPass] = useState(null);

    const handleHostUserChange = (e) =>{
        const target = e.target;
        setHostUsername(target.value);
    }
    const handleHostPassChange = (e) =>{
        const target = e.target;
        setHostPass(target.value);
    }
    const handleLogin = () =>{
        loginCallBack(hostUsername, hostPass);
    }

    return(<>
    <div className="popup-bg-container">
        <div className="popup-content-box">
            <button className="popup-close-button" onClick={toggleClose}>x</button>
            <h1 className="host-header">Host Login</h1>
        <input className="popup-host-username"
            type="text"
            placeholder="Enter Username"
            value={hostUsername}
            onChange={handleHostUserChange}
            ></input>

            <input className="popup-host-password"
            type="password"
            placeholder="Enter Password"
            value={hostPass}
            onChange={handleHostPassChange}
            ></input>

            <button className="popup-host-submit" onClick={handleLogin}>Login</button>
        </div>
    </div>
    </>);
}

export default HostPopup;