import { initializeApp } from "firebase/app"; 
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAsQHwzJMe4Qrg4Nn3ddo_B9Bfj6Q_cMVY",
    authDomain: "fir-98881.firebaseapp.com",
    projectId: "fir-98881",
    storageBucket: "fir-98881.appspot.com",
    messagingSenderId: "398504123799",
    appId: "1:398504123799:web:ed9b5cd89fbb344144b8d2",
    measurementId: "G-26Z5FFSEYD"
  };

  
  const Firebase = initializeApp(firebaseConfig); 
 
  export { Firebase }