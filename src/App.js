import React, { useState } from 'react'
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore/';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const config = {
  apiKey: "AIzaSyAgSHQaZj7Efrk7JyZpKpACrzyn_KIHnt8",
  authDomain: "facebook-messenger-3e5f3.firebaseapp.com",
  projectId: "facebook-messenger-3e5f3",
  storageBucket: "facebook-messenger-3e5f3.appspot.com",
  messagingSenderId: "811199670485",
  appId: "1:811199670485:web:a33121fd362c617c901a5c",
  measurementId: "G-99PPM2WJL1"
}

firebase.initializeApp(config)

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>


    </div>
  );
}

// When triggered, asks user to authenticate account with their pre-existing google account to sign in.
function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

// When triggered, signs out of user account.

function SignOut(){
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

// Stores messages
function ChatRoom() {

  // references a firestore collection. This is so the collection of messages appear in the app.
  const messagesRef = firestore.collection('messages');
  // Queries for the messages made by users in the chat and lists them by timestamp.
  const query = messagesRef.orderBy('createdAt').limit(25);
  // listens for updates to collection in real time using the useCollectionData as a data hook. 
  // This returns each object where each object is a message that has been uploaded into the data base.
  const [messages] = useCollectionData(query, {idField: 'id'});
  
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {

    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  }

  return (
    <>
      <div>
        {/* Maps over the array of messages to render each chat bubble */}
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

        <button type="submit">🕊️</button>

      </form>
      
    </>
  )

}

function ChatMessage(props) {
// Shows text in chat by accessing 
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
  
  return (
  <div className={`message ${messageClass}`}>
    <p>{text}</p>
  </div>

  )
}

export default App;
