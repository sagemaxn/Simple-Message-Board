import React, {useState, useEffect} from 'react';
import firebase from '../firebase.js';

import styled from 'styled-components';

const PostStyles = styled.div`
.post{
    margin-bottom: 10px;
    padding: 6px;
    border: solid grey;
    border-radius: 7px;
    overflow-wrap: anywhere;
    width: 300px;
    height: auto;
    display: grid;
    grid: 50px 100px / 1fr 1fr
    
}
.time-posted{
    float: right;
    grid-columns: 2 /3;
}
.poster-name{
    font-weight: bold;
    float: left;
}
#signOutBtn{
    position: fixed;
    right: 0;
    top:0;
}
.message{
    grid-column-start: 1;
    grid-column-end: 3;
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


function SignedIn(){
    const [hidden, setHidden] = useState(true);
    const [userDisplayName, setUserDisplayName] = useState(false);
    const [userID, setUserId] = useState('')
    const db = firebase.firestore()
    const [postsRef, setPostsRef] = useState(db.collection('posts'))
    const [post, setPost] = useState('');
    const [dev, setDev] = useState('');
    const [allPosts, setAllPosts] = useState('')
    const [flip, setFlip] = useState(true)
  //  const [createPost, setCreatePost] = useState(function(){console.log('1')})
    
    //const [createPost, setCreatePost] = useState('')

    function handleChange(event){
    
    setPost(event.target.value)
    console.log(post)
    }

  useEffect(() => {
    let db = firebase.firestore();
       //let postsRef = db.collection('posts')
       //.orderByKey().limitToLast(100);
       console.log(postsRef)
       //postsRef.where('uid', '==', user.uid).onSnapshot(querySnapshot => {
       // const state = querySnapshot.val()
   
      //setDev(state)
      db.collection("posts").orderBy("createdAt", "desc")
.get()
.then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  console.log(data); 
  let time = ''
  //const sortAllPosts = data.sort(function(prev,cur){return prev-cur});
  //console.log(sortAllPosts)
  setAllPosts(data.map((piece)=>{ 
      if(piece.createdAt){
          time = new Date(piece.createdAt.seconds *1000).toLocaleString()
          };
        return <div className="post">
                    <span className="poster-name">{piece.Name}</span>
                    <span className="time-posted">{time}</span>
                    <p className="message">{piece.userPost}</p>
               </div>}))

});
    }, [flip]);


    
 //   firebase.firestore().postsRef.set(dev);
////  console.log('DATA SAVED');
//}
//)
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
        <div id="userDetails"><h3>Your Name: {userDisplayName}</h3></div>
        <form onSubmit={(e)=>e.preventDefault()}>
            <textarea value={post} onChange={handleChange}></textarea>
            <input type="submit" value="Submit" onClick={()=>{
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
        <PostStyles>
        <div onChange={handleChange}>{allPosts}</div>
        
        <button id="signOutBtn" onClick={clickHandler}>Sign Out</button>
        </PostStyles>
    </section>
    )
}
//const serverTimestamp = firebase.firestore.FieldValue;
export default SignedIn