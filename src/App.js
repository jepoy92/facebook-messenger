import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAgSHQaZj7Efrk7JyZpKpACrzyn_KIHnt8",
  authDomain: "facebook-messenger-3e5f3.firebaseapp.com",
  projectId: "facebook-messenger-3e5f3",
  storageBucket: "facebook-messenger-3e5f3.appspot.com",
  messagingSenderId: "811199670485",
  appId: "1:811199670485:web:a33121fd362c617c901a5c",
  measurementId: "G-99PPM2WJL1"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {use ? <ChatRoom /> : <SignIn />}
      </section>


    </div>
  );
}

function SignIn(){

  const signInWithGoogle = () {
    const provider = new.firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
}

export default App;
