import { useState } from "react";
import "./login.css"
import HostPopup from "./hostpopup";
import JoinPopup from "./joinpopup";
import RegisterPopup from "./registerpopup";

function Login({newAcctCB, loginCB}){
    const [showHost, setShowHost] = useState(null);
    const [showJoin, setShowJoin] = useState(null);
    const [showRegister, setShowRegister] = useState(null);

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
        if(showJoin)
            setShowJoin(false);
        else
            setShowJoin(true);
    }
    const renderJoin = () =>{
        if(showJoin)
            return <JoinPopup toggleClose={toggleJoin}/>
    }

    const toggleRegister = () =>{
        if(showRegister)
            setShowRegister(false);
        else
            setShowRegister(true);
    }
    const renderRegister = () =>{
        if(showJoin)
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