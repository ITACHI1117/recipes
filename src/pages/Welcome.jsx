import React from "react";
import { Link } from "react-router-dom";
import backImg from "../assets/images/backImg.png";

function Welcome() {
  return (
    <>
      <div className="welcomeMessage">
        <h1>Recipes</h1>
        <h2>
          Hi there! <br /> Want to get access to avariet of recipes? youre in
          the right place sign In Now!
        </h2>
        <Link to={`/signUp`}>
          <button className="YellowBtn">Sign Up</button>
        </Link>
      </div>
      <div className="backgroundImg">
        <img className="backImg" src={backImg} alt="" />
      </div>
    </>
  );
}

export default Welcome;
