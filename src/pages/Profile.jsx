import React, { useEffect, useState } from "react";
import image from "../assets/images/foodimg1.png";
import image2 from "../assets/images/darkWater.png";
import google from "../assets/images/google.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import chefImg from "../assets/images/chefImg.png";
import { Link } from "react-router-dom";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function Profile({ toggleTheme, Icon }) {
  const { loading, error, profileImg, setImageUpload, upload } =
    useContext(DataContext);

  console.log(profileImg);
  //   console.log(decodeURIComponent(code));

  let id = 1234;
  if (loading) {
    return (
      <section className="backBody">
        <div className="toggler" onClick={toggleTheme}></div>

        <article className="login-box">
          <div className="loading">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="img-div">
            <img className="water-img" src={image} alt="" />
            <img className="water-img2" src={image2} alt="" />
          </div>
        </article>
      </section>
    );
  }

  const getError = () => {
    if (error == "auth/internal-error") {
      return <h6 className="error">NetWork Error</h6>;
    }
    if (error == "auth/popup-closed-by-user") {
      return <h6 className="error">Canceled SignIn</h6>;
    }
    if (error == "auth/email-already-in-use") {
      return <h6 className="error">Email already In use</h6>;
    }
    if (error == "auth/invalid-email") {
      return <h6 className="error">Invalid Email</h6>;
    }
    if (error == "auth/weak-password") {
      return <h6 className="error">Weak Password</h6>;
    }
  };

  return (
    <section className="backBody">
      <div className="toggler" onClick={toggleTheme}>
        <img className="theme-Icon" src={Icon} alt="" />
      </div>

      <article className="login-box">
        <div className="form-div2">
          {getError()}
          <h1 className="logText">Profile Image</h1>
          <div className="profilePageImg">
            <img src={profileImg ? profileImg : chefImg} alt="" />
          </div>
          <div className="StyledInput">
            <input
              type={"file"}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </div>

          <div className="link-btn02">
            {!profileImg ? (
              <button className="link-btn002" onClick={() => upload()}>
                Add
              </button>
            ) : (
              <Link className="link" to={`/login`}>
                <button className="link-btn002Green">Login</button>
              </Link>
            )}
          </div>

          <article className="social-links">
            <p>or login and signup with</p>
            <section className="links-row"></section>
          </article>
        </div>
        <div className="img-div">
          <img className="water-img" src={image} alt="" />
          <img className="water-img2" src={image2} alt="" />
        </div>
      </article>
    </section>
  );
}

export default Profile;
