import React, { useEffect } from "react";
import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import { useLoaderData } from "react-router-dom";

function ProfilePage() {
  const userIdentify = useLoaderData();
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userIdentify}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadError(error);
      });
  }, []);
  return <div>{userIdentify}</div>;
}

export default ProfilePage;
