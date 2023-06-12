import "./savepopup.css"
import { useState } from "react";

export default function SavePopup ({closeCB, saveCB, folders}){
    const [folderName, setFolderName] = useState("");
    const [boardName, setBoardName] = useState("");
    const [showFolders, setShowFolders] = useState(false);

    const handleFolderChange = (e) =>{
        const target = e.target;
        setFolderName(target.value);
    }
    const handleBoardNameChange = (e) =>{
        const target = e.target;
        setBoardName(target.value);
    }
    const handleSave = () =>{
        saveCB(folderName, boardName)
    }

    const toggleFolders = () =>{
        setShowFolders(!showFolders);
    }
    const renderFolders = () =>{
        console.log(folders)
        if(showFolders){
            return <div className="dropdown">
                {folders.map((name, ind) =>(
                    makeFolderButtons(name, ind)
                ))}
            </div>
        }
    }
    const makeFolderButtons = (name, ind) =>{
        return <button className="folder-button" value={name} onClick={handleFolderClick}>{name}</button>
    }
    const handleFolderClick = (e) =>{
        setFolderName(e.target.value);
        toggleFolders()
    }

    return(
        <>
        <div className="popup-container">
            <div className="popup">
                <button className="popup-close-button" onClick={closeCB}>X</button>
                <span className="popup-title-text">Save Your Board</span>
                <div className="popup-folder-con">
                    <input className="popup-save-input"
                    type="text"
                    placeholder="Enter the folder where the board will be saved"
                    value={folderName}
                    onChange={handleFolderChange}
                    ></input>
                    <button className="popup-dropdown" onClick={toggleFolders}>Browse</button>
                    {renderFolders()}
                    </div>
                <input className="popup-save-input"
                    type="text"
                    placeholder="Enter board name"
                    value={boardName}
                    onChange={handleBoardNameChange}
                ></input>

            <button className="popup-save-submit" onClick={handleSave}>Save</button>
                
            </div>
        </div>
        </>
    );
}