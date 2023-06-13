import { useState } from "react";
import './folderpopup.css'
import BoardConfPopup from "./boardconfpopup";
import FolderConfPopup from "./folderconfpopup";

function FolderPopup({folder, boardList, deleteCB, loadCB, closeCB}){
    const [showFolderDelConf, setShowFolderDelConf] = useState(false);
    const [showBoardDelConf, setShowBoardDelConf] = useState(false);
    const [currBoard, setCurrBoard] = useState("");
    
    const renderBoardButtons = (item, ind) =>{
        const adjustedInd = ind * 2;
        return <>
            <button className="folder-boardlist-button" key={adjustedInd} 
            value={item} onClick={handleBoardButtonClick}>
                {item}
            </button>
            <button className="folder-delete-button" key={adjustedInd + 1} value={item}
            onClick={handleDelButtonClick}>del</button>
        </>
    }

    const handleBoardButtonClick = (e) =>{
        loadCB(folder, e.target.value);
    }
    const handleDelButtonClick = (e) =>{
        setCurrBoard(e.target.value);
        toggleBoardConf();
    }

    const toggleBoardConf = () =>{
        setShowBoardDelConf(!showBoardDelConf);
    }
    const toggleFolderConf = () =>{
        setShowFolderDelConf(!showFolderDelConf);
    }
    const renderConfPopups = () =>{
        if(showBoardDelConf)
            return <BoardConfPopup board={currBoard} deleteCB={handleBoardDel} closeCB={toggleBoardConf}/>
        else if(showFolderDelConf)
            return <FolderConfPopup deleteCB={handleFolderDel} closeCB={toggleFolderConf}/>
    }

    const handleBoardDel = (board) =>{
        toggleBoardConf()
        deleteCB(folder+"/"+board);
    }
    const handleFolderDel = () =>{
        toggleFolderConf();
        deleteCB(folder)
    }

    return(<>
    <div className="popup-bg-container">
        <div className="popup-content-box">
            <button className="popup-close-button" onClick={closeCB}>x</button>
            <h1 className="host-header">{folder}</h1>
            <div className="folder-boardlist-containter">
                {boardList.map((item, ind) =>(
                    renderBoardButtons(item, ind)
                ))}
            </div>
            {renderConfPopups()}
            <button className="delete-folder-button" onClick={toggleFolderConf}>Delete Folder</button>
        </div>
    </div>
    </>);
}

export default FolderPopup;