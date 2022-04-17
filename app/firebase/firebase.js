
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASA_yVZMUuGli6rwa_mtCS5nKD3M7v40A",
  authDomain: "todoapp-3aeed.firebaseapp.com",
  databaseURL: "https://todoapp-3aeed-default-rtdb.firebaseio.com",
  projectId: "todoapp-3aeed",
  storageBucket: "todoapp-3aeed.appspot.com",
  messagingSenderId: "120645537816",
  appId: "1:120645537816:web:b7ecad4a61d54f96f0f36d",
  measurementId: "G-3G77QE35CZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
