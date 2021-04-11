import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCSKNcL6ekfUSx4OlWpsMbdrE84EG7eujI",
  authDomain: "yata-96c4d.firebaseapp.com",
  projectId: "yata-96c4d",
  storageBucket: "yata-96c4d.appspot.com",
  messagingSenderId: "148886328864",
  appId: "1:148886328864:web:12873101622ce9b01f8e45",
  measurementId: "G-CNMCBE196G",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
