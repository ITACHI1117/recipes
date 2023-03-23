import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import backImg from "../assets/images/backImg.png";
import cheImg from "../assets/images/chefImg.png";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [NavProfilePic, setNavProfilePic] = useState("");
  const [Categories, setCategories] = useState();
  const [CatItem, setCatItem] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const mealCategory = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegetarian",
    "BreakFast",
  ];

  const randomMealCategory = Math.floor(Math.random() * mealCategory.length);
  //   `https:www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory[randomMealCategory]}`
  //   useEffect(() => {
  //     function getData() {
  //       setLoading(true);
  //       fetch(
  //         `https:www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory[randomMealCategory]}`
  //       )
  //         .then((response) => response.json())
  //         .then((data) => setCategories(data.meals));
  //     }
  //     if (Categories) {
  //       setLoading(false);
  //     }
  //     getData();
  //   }, []);

  //   function filterCat(dishId) {
  //     console.log(dishId);
  //   }
  if (Categories === undefined) {
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
  async function redirect(dishId) {
    await dishId;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate(`/all-meals/${dishId}`, { replace: false });
    });
  }

  return (
    <div className="containAll">
      <nav className="homeNav">
        <h1>Recipes</h1>
        <Link to={`/profilePage/${userIdentify}`}>
          <img src={NavProfilePic ? NavProfilePic : cheImg} alt="" />
        </Link>
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
        <div className="Cat">
          <h1>Meals</h1>
          <div className="CatGrid">
            {Categories.map(({ strMeal, strMealThumb, idMeal }) => {
              return (
                // <Link className="link" to={`/all-meals/${CatItem}`}>
                <div
                  key={idMeal}
                  className="CatItem"
                  onClick={() => redirect(idMeal)}
                >
                  <img src={strMealThumb} alt="" />
                  <h1>{strMeal}</h1>
                </div>
                // </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
