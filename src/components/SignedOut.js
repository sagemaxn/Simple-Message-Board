import React, {useState} from 'react';
import firebase from '../firebase.js';

import styled from 'styled-components';


const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();



function SignedOut(props){
    const [hidden2, setHidden2] = useState(false);

   function clickHandler(){
    auth.signInWithPopup(provider);
  //  auth.onAuthStateChanged(user => {
   //     if(user){
            
   //         setHidden2(true);
            

           
            
     //   }
    //    else{
    //        setHidden2(false);
    //    }
   // })
    
}
      
    return( 
    <div className="toggleHide" hidden={!props.hide}>    
    <section id="SignedOut">
        <div>Please sign in to continue.</div>
        <button id="signInBtn" onClick={clickHandler}>Sign in with Google</button>
        
    </section>
    </div>
    
    )
}

export default SignedOut