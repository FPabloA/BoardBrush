import { useState } from "react";

function Login(){
    const [hostUsername, setHostUsername] = useState(null);
    const [hostPass, setHostPass] = useState(null);
    const [playerUsername, setPlayerUserName] = useState(null);
    const [roomCode, setRoomCode] = useState(null);

    const handleHostUserChange = (e) =>{
        const target = e.target;
        setHostUsername(target.value);
        console.log("host user is: " + hostUsername);
    }
    const handleHostPassChange = (e) =>{
        const target = e.target;
        setHostPass(target.value);
        console.log("host pass is: " + hostPass);
    }

    const handlePlayerUserChange = (e) =>{
        const target = e.target;
        setPlayerUserName(target.value);
    }
    const HandleRoomCodeChange = (e) =>{
        const target = e.target;
        setRoomCode(target.value);
    }

    return (<>
    <div className="login-div">
        <h1 className="login-title">Board Brush</h1>
        <h2 className="login-subtitle">make your imagination reality</h2>

        <div className="login-host-container">
            <input className="login-host-username"
            type="text"
            placeholder="Enter Username"
            value={hostUsername}
            onChange={handleHostUserChange}
            ></input>

            <input className="login-host-password"
            type="password"
            placeholder="Enter Password"
            value={hostPass}
            onChange={handleHostPassChange}
            ></input>

            <button className="login-host-submit">login</button>
        </div>
        <div className="login-join-container">
            <input className="login-player-username"
            type="text"
            placeholder="Enter Username"
            value={playerUsername}
            onChange={handlePlayerUserChange}
            ></input>

            <input className="login-player-roomcode"
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={HandleRoomCodeChange}
            ></input>

            <button className="login-host-submit">join</button>
        </div>
    </div>
    </>)
}

export default Login;