import React, {useState} from 'react';
import firebase from '../firebase.js';

import styled from 'styled-components';

const Styles = styled.div`
#SignedOut{display: flex;
flex: center;}
#signInBtn {margin: auto;
            height: 100px;}
`

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

function clickHandler(){
    auth.signInWithPopup(provider)
}

function SignedOut(){
    const [hidden, setHidden] = useState(false);
    auth.onAuthStateChanged(user => {
        if(user){
            setHidden(true);
        }
        else{
            setHidden(false);
        }
    })    
    return( 
          
    <section id="SignedOut" hidden={hidden}>
    
        <button id="signInBtn" onClick={clickHandler}>Sign in with Google</button>
        
    </section>
    
    )
}

export default SignedOut