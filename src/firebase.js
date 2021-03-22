import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBUwufLrdiO_gsMiciLrCYo6SocsrAhLf0",
    authDomain: "slack-clone-c32ca.firebaseapp.com",
    projectId: "slack-clone-c32ca",
    storageBucket: "slack-clone-c32ca.appspot.com",
    messagingSenderId: "97577896686",
    appId: "1:97577896686:web:fbdf1bd4ef4781406341ff"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, db, provider }