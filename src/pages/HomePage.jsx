import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import backImg from "../assets/images/backImg.png";
import SearchBox from "../components/SearchBox";

function HomePage() {
  const [NavProfilePic, setNavProfilePic] = useState("");

  const userIdentify = useLoaderData();
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userIdentify}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNavProfilePic(snapshot.val().profile_picture);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadError(error);
      });
  }, []);
  return (
    <div className="containAll">
      <nav className="homeNav">
        <h1>Recipes</h1>
        <img src={NavProfilePic} alt="" />
      </nav>
      <div className="HomeMessage">
        <h1>Recipes</h1>
        <h2>International Recipes All in one place</h2>
      </div>
      <div className="backgroundHomeImg">
        <img className="backHomeImg" src={backImg} alt="" />
      </div>
      <section>
        <h1>Search</h1>
        <SearchBox />
      </section>
    </div>
  );
}

export default HomePage;
