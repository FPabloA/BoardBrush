import logo from './logo.svg';
// import './App.css';
import AppComponent from './AppComponent';
// import Login from './loginpage/login';
// //import Load from './loadpage/load';
import { BrowserRouter as Router}
    from 'react-router-dom';
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAacW5UZ77qVxkLIr_sqn30I-0t3YzMNS8",
//   authDomain: "boardbrush-e581f.firebaseapp.com",
//   databaseURL: "https://boardbrush-e581f-default-rtdb.firebaseio.com",
//   projectId: "boardbrush-e581f",
//   storageBucket: "boardbrush-e581f.appspot.com",
//   messagingSenderId: "130994736404",
//   appId: "1:130994736404:web:2b89d74f3c2fd16403c601",
//   measurementId: "G-V4MP1DCGZ6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const db = getFirestore(app);

function App() {
  return (<>
  <Router>
    <AppComponent/>
  </Router>
  </>
  );
}

export default App;
