import './App.css';
import Login from './loginpage/login';
import Load from './loadpage/load';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate }
    from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { ref, child, get, getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import Editor from './editorpage/editor';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


function AppComponent() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [gameBoard, setGameBoard] = useState(null);
    const [dirKeys, setDirKeys] = useState([]);

    useEffect (() =>{
      try{
        const val = window.sessionStorage.getItem("user");
        if(val){
          setUser(JSON.parse(val));
        }
      }catch(err){
        console.log("user error");
        return;
      }
    }, []);

    useEffect(() =>{
      if(user != null){
        window.sessionStorage.setItem("user", JSON.stringify(user));
      }
    }, [user]);

    const newAcctCallback = (email, password) =>{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate('/boardbrush/load');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(errorMsg);
        
      })
    }
  
    const loginCallback = (email, password) =>{
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate('/boardbrush/load');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(errorMsg);
      })
    }

    const signoutCallback = () =>{
      signOut(auth).then(() => {
        navigate('/boardbrush');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(errorMsg);
      });
    }

    const renderLogin = () =>{
        if(user){
            return(<>
                <Load loggedUser={user} doEditor={setEditorVars} signoutCB={signoutCallback}/>
            </>)
        }
        else{
            return(<>
                <h1>Something went wrong</h1>
            </>);
        }
    }

    const loadEditor = () =>{
      if(gameBoard){
        return(<>
          <Editor board={gameBoard} user={user} folders={dirKeys}/>
        </>)
      }
      else{
        return(<>
          <Editor board={null} user={user} folders={dirKeys}/>
        </>)
      }
    }
    const setEditorVars = (board, keys) =>{
      setGameBoard(board);
      setDirKeys(keys);
    }
  
    return (<>
    <Routes>
    <Route exact path='/boardbrush' element={<Login newAcctCB={newAcctCallback} loginCB={loginCallback} />} />
    <Route path='/boardbrush/load' element={renderLogin()} />
    <Route path='/boardbrush/edit' element={loadEditor()} />
    </Routes>
    </>
    );
  }
  export default AppComponent;