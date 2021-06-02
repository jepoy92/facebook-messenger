import React from 'react'
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyB4H2RGr8rnMPwpom0Bj0R3CfeFV-9PlBI",
  authDomain: "fakebook-messenger-b4ca5.firebaseapp.com",
  projectId: "fakebook-messenger-b4ca5",
  storageBucket: "fakebook-messenger-b4ca5.appspot.com",
  messagingSenderId: "167183518273",
  appId: "1:167183518273:web:fdd007d06d135674ded4c0",
  measurementId: "G-V92JCS5JT0"
})

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
  
  return (
    <>
      <div>
        {/* Maps over the array of messages to render each chat bubble */}
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <div>

      </div>
      
    </>
  )

}

function ChatMessage(props) {
// Shows text in chat by accessing 
  const { text, uid } = props.message;

  return <p>{text}</p>
}

export default App;
