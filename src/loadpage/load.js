import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ref, child, get, getDatabase, remove } from "firebase/database";
import { initializeApp } from "firebase/app";
import FolderPopup from "./folderpopup";
import "./load.css";


const firebaseConfig = {
    apiKey: "AIzaSyAacW5UZ77qVxkLIr_sqn30I-0t3YzMNS8",
    authDomain: "boardbrush-e581f.firebaseapp.com",
    databaseURL: "https://boardbrush-e581f-default-rtdb.firebaseio.com",
    projectId: "boardbrush-e581f",
    storageBucket: "boardbrush-e581f.appspot.com",
    messagingSenderId: "130994736404",
    appId: "1:130994736404:web:2b89d74f3c2fd16403c601",
    measurementId: "G-V4MP1DCGZ6"
  };
const app = initializeApp(firebaseConfig);
const db = getDatabase();

function Load({loggedUser, doEditor, signoutCB}) {
    const navigate = useNavigate();
    const [directory, setDirectory] = useState(null);
    const [dirKeys, setDirKeys] = useState([]);
    const [currFolder, setCurrFolder] = useState("");
    const [currBoards, setCurrBoards] = useState([]);
    const [showFolderPopup, setShowFolderPopup] = useState(false);
    
    
    //this is probably incredibly inefficient
    get(child(ref(db), `users/${loggedUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        }).then((result) => doDir(result));
    
    const doDir = (promise) =>{
        
        if(directory)
            return;
        setDirectory(promise);
        if(promise)
            setDirKeys(Object.keys(promise));
    }

    const parseUser = () => {
        const ind = loggedUser.email.indexOf("@");
        return loggedUser.email.substring(0, ind);
    }

    const handleNewBoard = () =>{
        doEditor(null, dirKeys);
        navigate('/boardbrush/edit');
    }

    const handleLogout = () =>{
        signoutCB();
    }
    
    //folder functions
   const renderFolders = () =>{
        if(directory){
            const keys = [...dirKeys];
            let folders = keys.map((folder, ind) =>
                doFolders(folder, ind)
            )
            return folders;  
        }
           
    }
    const doFolders = (folder, ind) =>{
        return <button className="load-folder" key={ind} value={folder} onClick={handleFolderClick}>{folder}</button>
    }
    const handleFolderClick = (e) =>{
        const folderDir = directory[e.target.value];
        const boardList = Object.keys(folderDir)
        setCurrBoards([...boardList])
        setCurrFolder(e.target.value);
        toggleFolderPopup()
    }
    const toggleFolderPopup = () =>{
        setShowFolderPopup(!showFolderPopup)
    }
    const renderFolderPopup = () =>{
        if(showFolderPopup)
            return <FolderPopup deleteCB={handleDel} loadCB={handleLoad} folder={currFolder} boardList={currBoards} closeCB={toggleFolderPopup}/>
    }

    const handleDel = (path) =>{
        //do the delete
        console.log("deleting " + path);
        toggleFolderPopup();
        remove(ref(db, 'users/'+loggedUser.uid+'/'+path)).then(setDirectory(null))
    }
    const handleLoad = (folder, board) =>{
        toggleFolderPopup();
        console.log("loading " + folder+"/"+board);
        const boardFolder = directory[folder];
        let boardInfo = boardFolder[board];
        boardInfo.folder = folder;
        boardInfo.name = board;
        doEditor(boardInfo, dirKeys);
        navigate('/boardbrush/edit');
    }


    return (
        <>
        <div className="wrapper">
        <div className="load-header">
            
            <span className="load-header-text">Load Boards</span>
            <span className="load-header-name">{parseUser()}</span>
        </div>
            {/* <div className="load-recent">
                <div className="load-recent-header">
                    <span className="load-recent-text">Recent Boards</span>
                    
                </div>
            </div> */}
            <div className="load-folders">
                <div className="load-folder-header">
                    <span className="load-recent-text">Folders</span>
                    <button className="load-recent-button" onClick={handleNewBoard}>
                        <span className="load-new-text">New Board</span>    
                    </button>
                </div>
                <div className="load-folder-section">
                    {
                        renderFolders()
                    }
                </div>
                {renderFolderPopup()}
                    
            </div>
            <div className="load-footer">
                <button className="load-exit-button" onClick={handleLogout}>
                    <span className="load-exit-text">Exit</span>
                    
                </button>
            </div>
        </div>
            
        </>
    );
}
export default Load;