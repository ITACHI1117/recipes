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
      allUsers.map(({ email, id }) => {
        if (userEmail === email) {
          setLoginInUserId(id);
        }
      });
    }
  }, [allUsers]);

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

          {signed ? (
            <DoneComp />
          ) : (
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
                  className="inputLogin"
                  placeholder="Enter Your password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </section>
            </form>
          )}
          <div className="link-btn">
            <p>
              Login with email & <br /> password
            </p>
            {!signed ? (
              <button className="link-btn1" onClick={() => LogIn()}>
                Login
              </button>
            ) : (
              <Link className="link" to={`/home/${loginUserId}`}>
                <button className="link-btn2">
                  Home{" "}
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
            <p>
              Dont have an Account ?<Link to={`/signUp`}> SIGN UP</Link>
            </p>
          </article>
        </div>
        <div className="img-div">
          <img className="water-img" src={image} alt="" />
        </div>
      </article>
    </section>
  );
}

export default Login;
