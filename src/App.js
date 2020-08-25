import React, { useState, useEffect } from 'react';
import firebase from './firebase.js';


import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';

import './App.css';

const auth = firebase.auth();



function App() {
  const [prop, setProp] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState(false);
    const [userID, setUserId] = useState('');

  
  auth.onAuthStateChanged(user => {
        if(user){
            
            setProp(false);
            setUserDisplayName(user.displayName);
            setUserId(user.uid);

           
            
        }
        else{
            setProp(true);
        }
    })
  return (
    <div className="App">
      <h1 className="title">Message Board</h1>
      <SignedIn hide={prop} userID={userID} userDisplayName={userDisplayName}></SignedIn>
      <SignedOut hide={prop}></SignedOut>
    </div>
  );
}

export default App;
