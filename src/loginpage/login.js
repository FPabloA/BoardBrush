import { useState } from "react";
import "./login.css"
import HostPopup from "./hostpopup";
import JoinPopup from "./joinpopup";
import RegisterPopup from "./registerpopup";

function Login({newAcctCB, loginCB}){
    const [showHost, setShowHost] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggleHost = () =>{
        if(showHost)
            setShowHost(false);
        else
            setShowHost(true);
    }
    const renderHost = () =>{
        if(showHost)
            return <HostPopup loginCallBack={loginCB} toggleClose={toggleHost}/>
    }

    const toggleJoin = () =>{
        console.log("toggle Join")
        setShowJoin(!showJoin);
    }
    const renderJoin = () =>{
        if(showJoin)
            return <JoinPopup toggleClose={toggleJoin}/>
    }

    const toggleRegister = () =>{
        console.log("register")
        setShowRegister(!showRegister);
    }
    const renderRegister = () =>{
        if(showRegister)
            return <RegisterPopup registerCallBack={newAcctCB} toggleClose={toggleRegister}/>
    }

    return (<>
    <div className="login-div">
        <h1 className="login-title">Board Brush</h1>
        <h2 className="login-subtitle">make your imagination reality</h2>

        <div className="login-host-container">
            {renderHost()}
            <button className="login-popup-button" onClick={toggleHost}>Host</button>
        </div>
        <div className="login-join-container">
            {renderJoin()}
            <button className="login-popup-button" onClick={toggleJoin}>Join</button>
        </div>

        <div className="login-new-container">
            {renderRegister()}
            <button className="login-popup-button" onClick={toggleRegister}>Register</button>
        </div>
    </div>
    </>)
}

export default Login;