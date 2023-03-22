import React, { useEffect, useState } from "react";
import image from "../assets/images/foodimg1.png";
import image2 from "../assets/images/darkWater.png";
import google from "../assets/images/google.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import DoneComp from "../components/DoneComp";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function SignUp({ toggleTheme, Icon }) {
  const {
    firstname,
    lastname,
    resturantname,
    phone,
    email,
    setFirstName,
    setLastName,
    setResturantname,
    setPhone,
    setEmail,
    setPassword,
    signIn,
    user,
    error,
    loading,
    signInWithGoogle,
  } = useContext(DataContext);

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
  // if (user) {
  //   window.location.href = `/profile/${user.email}/${user.displayName}/${code}`;
  // }

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
        <div className="form-div">
          {getError()}
          <h1 className="logText">Sign In</h1>

          <p>
            Sign in to your account to view your user profile <br />
            🙂
          </p>
          {user ? (
            <DoneComp />
          ) : (
            <form>
              <section className="row">
                <div className="girdItem">
                  <input
                    className="input1"
                    placeholder="First Name"
                    type={"text"}
                    value={firstname}
                    name="names"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="girdItem">
                  <input
                    className="input1"
                    placeholder="Last Name"
                    type={"text"}
                    value={lastname}
                    name="names"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="girdItem">
                  <input
                    className="input1"
                    placeholder="Resturant Name"
                    type={"text"}
                    value={resturantname}
                    name="names"
                    onChange={(e) => setResturantname(e.target.value)}
                  />
                </div>
                <div className="girdItem">
                  <input
                    className="input1"
                    placeholder="Phone"
                    type={"tel"}
                    value={phone}
                    name="names"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="girdItem">
                  <input
                    className="input1"
                    placeholder="Email"
                    type={"email"}
                    value={email}
                    name="names"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="girdItem">
                  <input
                    className="input1"
                    placeholder="Password"
                    type={"password"}
                    name="names"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </section>
            </form>
          )}

          <div className="link-btn">
            <p>
              Sign in with email & <br /> password
            </p>
            {!user ? (
              <button className="link-btn1" onClick={() => signIn()}>
                SignIn
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1_25)">
                    <path
                      d="M6.66666 16H25.3333"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.3333 24L25.3333 16"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.3333 8L25.3333 16"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_25">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            ) : (
              <Link className="link" to={`/profile`}>
                <button className="link-btn2">
                  Next
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1_25)">
                      <path
                        d="M6.66666 16H25.3333"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.3333 24L25.3333 16"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.3333 8L25.3333 16"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_25">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </Link>
            )}
          </div>
          <hr />

          <article className="social-links">
            <p>or login and signup with</p>
            <section className="links-row">
              <div className="box" onClick={() => signInWithGoogle()}>
                <img src={google} alt="facebook" />

                <h4>Google</h4>
              </div>
            </section>
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

export default SignUp;
