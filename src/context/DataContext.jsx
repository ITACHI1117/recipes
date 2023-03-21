import React, { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { auth, storage, database, reference } from "../firebase";
import { set } from "firebase/database";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const userId = uuidv4();

  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [resturantname, setResturantname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   sign in  with email
  const signIn = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        setUser(user);
        set(reference(database, "users/" + userId), {
          id: userId,
          firstname: firstname,
          lastname: lastname,
          resturantname: resturantname,
          email: email,
          profile_picture: " ",
          phone: phone,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorCode);
        setLoading(false);
        // ..
      });
  };

  //   sign in with google

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorCode);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setLoading(false);
      });
  };

  return (
    <DataContext.Provider
      value={{
        firstname,
        lastname,
        resturantname,
        phone,
        email,
        loading,
        setEmail,
        user,
        error,
        setFirstName,
        setLastName,
        setResturantname,
        setPhone,
        setPassword,
        signIn,
        signInWithGoogle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
