import React, { useEffect, useState } from "react";
import image from "../assets/images/foodimg1.png";
import image2 from "../assets/images/darkWater.png";
import google from "../assets/images/google.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function Login({ toggleTheme, Icon }) {
  const {
    LogIn,
    email,
    setEmail,
    setPassword,
    signed,
    allUsers,
    signIn,
    user,
    error,
    loading,
    signInWithGoogle,
  } = useContext(DataContext);

  //   let code = `${encodeURIComponent(user.photoURL)}`;

  //   console.log(decodeURIComponent(code));

  const [loginUserId, setLoginInUserId] = useState("");

  useEffect(() => {
    let userEmail = email;
    if (allUsers === undefined) {
      return;
    } else {
      console.log("done");
      allUsers.map(({ email, id, profile_picture }) => {
        if (userEmail === email) {
          setLoginInUserId(id);
          console.log(id);
        }
      });
    }
  }, [allUsers, signIn]);

  const [btnValue, setBtnValue] = useState("Next");
  let i = 0;
  const animate = () => {
    let input1 = document.querySelector(".inputLogin");
    let input2 = document.querySelector(".input2");
    let btn = document.querySelector(".link-btn1");
    let btn2 = document.querySelector(".link-btn2");

    btn.style.display = "none";
    btn2.style.display = "flex";
    if (i === 0) {
      input1.style.transform = "translateX(-100%)";
      input1.style.opacity = 0;
      setBtnValue("LogIn");
      i += 1;
    }

    setTimeout(() => {
      input2.style.transform = "translateX(-100%)";
      input2.style.opacity = 1;
    }, 500);
  };
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
    if (error == "auth/user-not-found") {
      return <h6 className="error">User not Found</h6>;
    }
    if (error == "auth/email-already-in-use") {
      return <h6 className="error">Email already In use</h6>;
    }
    if (error == "auth/invalid-email") {
      return <h6 className="error">Invalid Email</h6>;
    }
    if (error == "auth/wrong-password") {
      return <h6 className="error">Wrong Password</h6>;
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
          <h1 className="logText">Login</h1>

          <p>
            Login to your account <br />
            🙂
          </p>

          <form>
            <section className="row">
              <input
                className="inputLogin"
                placeholder="Enter Your email address"
                type="email"
                name="names"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input2"
                placeholder="Enter Your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </form>
          <div className="link-btn">
            <p>
              Login with email & <br /> password
            </p>
            <button className="link-btn1" onClick={() => animate()}>
              {btnValue}
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
            {!signed ? (
              <button className="link-btn2" onClick={() => LogIn()}>
                {btnValue}
              </button>
            ) : (
              <Link className="link" to={`/home/${loginUserId}`}>
                <button className="link-btn2" onClick={() => LogIn()}>
                  Home
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

export default Login;
