import React, { useEffect, useState } from "react";
import image from "../assets/images/foodimg1.png";
import image2 from "../assets/images/darkWater.png";
import google from "../assets/images/google.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import DoneComp from "../components/DoneComp";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [loginUserId, setLoginInUserId] = useState();

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
  async function redirect() {
    await signed;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate(`/home/${loginUserId}`, { replace: true });
    });
  }

  if (loginUserId !== undefined) {
    redirect();
  }

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
              ""
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
      <img className="PhoneBackImg" src={image} alt="" />
    </section>
  );
}

export default Login;
