import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import { useLoaderData } from "react-router-dom";
import chefImg from "../assets/images/backImg.png";

function ProfilePage() {
  const userIdentify = useLoaderData();
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userIdentify}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserProfile(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadError(error);
      });
  }, []);

  if (userProfile === undefined) {
    return (
      <div>
        <div className="loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="backBody">
        <article className="login-boxProfile">
          <div className="img-divMeal">
            <img
              className="water-imgProfile"
              src={
                userProfile.profile_picture
                  ? userProfile.profile_picture
                  : chefImg
              }
              alt=""
            />
            {/* <img className="water-img2" src={image2} alt="" /> */}
          </div>
          <div className="form-divMeal">
            <h1 className="logText"></h1>
            <h2>FirstName: {userProfile.firstname}</h2>
            <h2>LastName: {userProfile.lastname}</h2>
            <h2>Restaurant: {userProfile.resturantname}</h2>
            <h2>Phone Number: {userProfile.phone}</h2>
            <h2>Email: {userProfile.email}</h2>

            <p></p>

            {/* <div className="link-btn">
                    <p>
                      Login with email & <br /> password
                    </p>
                  </div> */}
          </div>
        </article>
      </section>
    </>
  );
}

export default ProfilePage;
