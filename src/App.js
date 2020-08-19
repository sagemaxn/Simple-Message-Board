import React from 'react';
import firebase from './firebase.js';


import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Message Board</h1>
      <SignedIn></SignedIn>
      <SignedOut></SignedOut>
    </div>
  );
}

export default App;
