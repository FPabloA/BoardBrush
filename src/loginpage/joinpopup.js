import { useState } from "react";
import "./popup.css"
function JoinPopup({toggleClose}){
    const [playerUsername, setPlayerUserName] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const handlePlayerUserChange = (e) =>{
        const target = e.target;
        setPlayerUserName(target.value);
    }
    const handleRoomCodeChange = (e) =>{
        const target = e.target;
        setRoomCode(target.value);
    }

    return(<>
    <div className="popup-bg-container">
        <div className="popup-content-box">
            <button className="popup-close-button" onClick={toggleClose}>x</button>
            <h1 className="host-header">Join a Room</h1>
        <input className="popup-host-username"
            type="text"
            placeholder="Enter Username"
            value={playerUsername}
            onChange={handlePlayerUserChange}
            ></input>

            <input className="popup-host-password"
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={handleRoomCodeChange}
            ></input>

            <button className="popup-host-submit">Join</button>
        </div>
    </div>
    </>);
}

export default JoinPopup;