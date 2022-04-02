import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ9TsrZineejJ-NWMZdaPbbVXQPhkDSXk",
  authDomain: "dummyapp-ae31c.firebaseapp.com",
  databaseURL: "https://dummyapp-ae31c-default-rtdb.firebaseio.com",
  projectId: "dummyapp-ae31c",
  storageBucket: "dummyapp-ae31c.appspot.com",
  messagingSenderId: "368852635862",
  appId: "1:368852635862:web:4103cc793b64301ef23977",
  measurementId: "G-D4K60RFY34"


};

firebase.initializeApp(firebaseConfig);

export default firebase;
