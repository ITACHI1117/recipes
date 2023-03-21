// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2DN6eyWCpEl6kjEYVCXhh-y_IrPqQUgI",
  authDomain: "chateo-c4ff3.firebaseapp.com",
  projectId: "chateo-c4ff3",
  storageBucket: "chateo-c4ff3.appspot.com",
  messagingSenderId: "810779450882",
  appId: "1:810779450882:web:d1cffc178c7561cc67511b",
  databaseURL: "https://chateo-c4ff3-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);
const reference = ref;
export { app, auth, database, storage, reference };
