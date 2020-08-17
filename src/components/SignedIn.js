import React, {useState, useEffect} from 'react';
import firebase from '../firebase.js';

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

let unsubscribe;

function clickHandler(){
    auth.signOut()
}


let user
let post
const serverTimestamp = firebase.firestore.FieldValue;


function SignedIn(){
    const [hidden, setHidden] = useState(true);
    const [userDisplayName, setUserDisplayName] = useState(false);
    const [userID, setUserId] = useState('')
    const [postsRef, setPostsRef] = useState(db.collection('posts'))
    const [post, setPost] = useState('');
    const [dev, setDev] = useState('')
  //  const [createPost, setCreatePost] = useState(function(){console.log('1')})
    
    //const [createPost, setCreatePost] = useState('')

    function handleChange(event){
    
    setPost(event.target.value)
    console.log(post)
    }

   // useEffect(() => {
    //    setPostsRef(db.collection('posts')).then(postsRef.where('uid', '==', user.uid).onSnapshot(querySnapshot => {
   //     const state = querySnapshot.val()
   
   //   setDev(state)
  //  }));
  //  console.log('DATA RETRIEVED');
    
 //   firebase.firestore().postsRef.set(dev);
////  console.log('DATA SAVED');
//  }
 // )
    auth.onAuthStateChanged(user => {
        if(user){
            
            setHidden(false);
            setUserDisplayName(user.displayName);
            setUserId(user.uid)

           
            
        }
        else{
            setHidden(true);
        }
    })
    return( 
    <section id="SignedIn" hidden={hidden}>
        <div id="userDetails"><h3>{userDisplayName}</h3><p>{userID}</p></div>
        <form onSubmit={(e)=>e.preventDefault()}>
            <textarea value={post} onChange={handleChange}></textarea>
            <input type="submit" value="Submit" onClick={()=>postsRef.add({
                 uid: userID,
                 userPost: post,
                
              })}></input>
        </form>
        <button id="signOutBtn" onClick={clickHandler}>Sign Out</button>
    </section>
    )
}

export default SignedIn