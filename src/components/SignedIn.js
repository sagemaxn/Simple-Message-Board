import React, {useState, useEffect} from 'react';
import firebase from '../firebase.js';

import styled from 'styled-components';

const PostStyles = styled.div`
#SignedIn{
    margin-top: 50px;
    text-align: center;
}
form{
    height: 50px;
    display: flex;
    border-radius: 7px;
    border: solid 0;
    background-color: white;
    margin-bottom: 10px;
    margin-top: 5px;
    
    
}
textarea{
     resize: none; 
     width: 78%;
     height: 100%;
     border-radius: 7px;
     border: 0;
     padding: 0 6px;
     box-sizing: border-box;
     -moz-box-sizing: border-box;

}
.postButton{
    width: 18%;
    height: 50%;
    border-radius: 7px;
   
}
.post{
    margin-bottom: 15px;
    padding: 6px;
    box-shadow: 0px 5px 6px grey;
    border-radius: 7px;
    overflow-wrap: anywhere;
    text-align: left;
    
    background-color: white;
    display: grid;
    grid: 1fr 1fr / 1fr
    
}
.posterInfo{
    width: 95%;
}
.time-posted{
    float: right;
    font-size: 15px;
    color: grey
}
.poster-name{
    font-weight: bold;
    float: left;
    color: rgb(47, 67, 177)
}
#signOutBtn{
    position: fixed;
    font-size: 18px;
    right: 2px;
    border: solid 1px;
    border-radius: 3px;
    top:2px;
    height: 32px;
    box-sizing: border-box;
     -moz-box-sizing: border-box;
}
.message{
    grid-rows: 2 / 3;
    width: 95%;
    margin-top: 5px;
}

`

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();



let unsubscribe;

function clickHandler(){
    auth.signOut()
}


let user
let post


function SignedIn(props){
    let userDisplayName = props.userDisplayName;
    let userID = props.userID;
    const [hidden, setHidden] = useState(true);
   // const [userDisplayName, setUserDisplayName] = useState(false);
  //  const [userID, setUserId] = useState('')
    const db = firebase.firestore()
    const [postsRef, setPostsRef] = useState(db.collection('posts'))
    const [post, setPost] = useState('');
    const [dev, setDev] = useState('');
    const [allPosts, setAllPosts] = useState('')
    const [flip, setFlip] = useState(true)
    const [refresh, setRefresh] = useState(true)
  //  const [createPost, setCreatePost] = useState(function(){console.log('1')})
    
    //const [createPost, setCreatePost] = useState('')

    function handleChange(event){
    
    setPost(event.target.value)
    console.log(post)
    }

    function Refresh(){
        setRefresh(!refresh)
    }

  useEffect(() => {
    let time = ''
    let db = firebase.firestore();
       //let postsRef = db.collection('posts')
       //.orderByKey().limitToLast(100);
       console.log(postsRef)
       //postsRef.where('uid', '==', user.uid).onSnapshot(querySnapshot => {
       // const state = querySnapshot.val()
   
      //setDev(state)
      db.collection("posts").orderBy("createdAt")
.get()
.then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  let timeout = setTimeout( 
  setAllPosts(data.map((piece)=>{ 
      if(piece.createdAt){
          time = new Date(piece.createdAt.seconds *1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute: "2-digit"} )
          }
       else{
           time = new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute: "2-digit"})
       }  
        return <div className="post">
                    <div className="posterInfo">
                        <span className="poster-name">{piece.Name}</span>
                        <span className="time-posted">{time}</span>
                    </div>    
                    <p className="message">{piece.userPost}</p>
               </div>})),3000)

});
//let timeout = setTimeout(Refresh, 30000)
     
//just put an animation in here??

//return function cleanup() {
//  clearTimeout(timeout)
//}

    }, [flip, refresh]);


    
 //   firebase.firestore().postsRef.set(dev);
////  console.log('DATA SAVED');
//}
//)
    auth.onAuthStateChanged(user => {
        if(user){
            
           // setHidden(false);
            //setUserDisplayName(user.displayName);
           // setUserId(user.uid)

           
            
        }
        else{
            //setHidden(true);
        }
    })
    return( 
        <PostStyles>
    <section id="SignedIn" hidden={props.hide}>
        <div onChange={handleChange}>{allPosts}</div>
        <div id="userDetails">Your Name: {userDisplayName}</div>
        <form onSubmit={(e)=>e.preventDefault()}>
            <textarea value={post} onChange={handleChange} ></textarea>
            <input className="postButton" type="submit" value="Post!" onClick={()=>{
                setFlip(!flip)
                const time = firebase.firestore.FieldValue.serverTimestamp()
                postsRef.add({
                 uid: userID,
                 Name: userDisplayName,
                 userPost: post,
                 createdAt: time,
                 
                
              });setPost(``)}
              }></input> 
        </form>
        
        <button id="signOutBtn" onClick={clickHandler}>Sign Out</button>
        
    </section>
    </PostStyles>
    )
}
//const serverTimestamp = firebase.firestore.FieldValue;
export default SignedIn