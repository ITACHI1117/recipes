import React, { createContext, useState, useCallback, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { auth, storage, database, reference } from "../firebase";
import { set, get, child, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const userId = uuidv4();

  const [userIdentify, setUserIdentify] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [resturantname, setResturantname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signed, setSigned] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [searchMeal, setSearchMeal] = useState("");
  const [text, setText] = useState("");

  // Uploadg()
  const [uploaded, setUploaded] = useState(false);

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
        }).then(() => {
          setUserIdentify(userId);
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

  //   login Function
  function LogIn() {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setSigned(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  }
  function upload() {
    if (imageUpload === null) return;
    // Upload images to firebase Storage
    const imgRef = ref(
      storage,
      `images/usersProfileImg/${userIdentify}/${imageUpload.name + userId}`
    );
    uploadBytes(imgRef, imageUpload)
      .then((snaphost) => {
        // getting the download url for the uploaded image
        getDownloadURL(snaphost.ref).then((url) => {
          setProfileImg(url);
        });
      })
      .then(() => {
        setUploaded(true);
      });
  }

  useEffect(() => {
    if (signed === false) {
      return;
    } else if (signed === true) {
      // getting all users
      const dbRef = reference(database);
      get(child(dbRef, `users/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setAllUsers(Object.values(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.log(error);
          // setLoadError(error);
        });
    }
  }, [signed]);

  if (uploaded === true) {
    console.log(userIdentify);
    // update user Profile image in firebase realtime database
    update(reference(database, "users/" + userIdentify), {
      profile_picture: profileImg,
    }).catch((error) => {
      console.log(error);
    });
  }

  //   sign in with google

  return (
    <DataContext.Provider
      value={{
        firstname,
        lastname,
        resturantname,
        phone,
        email,
        loading,
        userIdentify,
        imageUpload,
        profileImg,
        signed,
        allUsers,
        searchMeal,
        setEmail,
        user,
        error,
        setFirstName,
        setLastName,
        setResturantname,
        setPhone,
        setPassword,
        signIn,
        upload,
        setImageUpload,
        setProfileImg,
        LogIn,
        setSearchMeal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
