import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function AllMeals() {
  const dishId = useLoaderData();
  const [meal, setMeal] = useState();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals));
  }, []);

  if (meal === undefined) {
    return;
  }
  const Ingridents = meal.map(
    ({
      idMeal,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
      strMeasure14,
    }) => {
      return (
        <div key={idMeal}>
          <p>
            {strMeasure1} - {strIngredient1}
          </p>
          <p>
            {strMeasure2} {strIngredient2}
          </p>
          <p>
            {strMeasure3} {strIngredient3}
          </p>
          <p>
            {strMeasure4} {strIngredient4}
          </p>
          <p>
            {strMeasure5} {strIngredient5}
          </p>
          <p>
            {strMeasure6} {strIngredient6}
          </p>
          <p>
            {strMeasure7} {strIngredient7}
          </p>
          <p>
            {strMeasure8} {strIngredient8}
          </p>
          <p>
            {strMeasure9} {strIngredient9}
          </p>
          <p>
            {strMeasure10} {strIngredient10}
          </p>
          <p>
            {strMeasure11} {strIngredient11}
          </p>
          <p>
            {strMeasure12} {strIngredient12}
          </p>
          <p>
            {strMeasure13} {strIngredient13}
          </p>
          <p>
            {strMeasure14} {strIngredient14}
          </p>
        </div>
      );
    }
  );

  return (
    <>
      <section className="backBody">
        <article className="login-boxMeal">
          {meal.map(
            ({
              strArea,
              strCategory,
              strMealThumb,
              strMeal,
              strInstructions,
              strYoutube,
              idMeal,
            }) => {
              return (
                <div key={idMeal}>
                  <div className="img-divMeal">
                    <img className="water-imgMeal" src={strMealThumb} alt="" />
                    {/* <img className="water-img2" src={image2} alt="" /> */}
                  </div>
                  <div className="form-divMeal">
                    <h1 className="logText">{strMeal}</h1>
                    <h2>Country ({strArea})</h2>
                    <h2>Category ({strCategory})</h2>
                    <h2>Instructions</h2>
                    <p className="Instruct">{strInstructions}</p>
                    <h2>Ingridents</h2>
                    {Ingridents === null ? " ww" : Ingridents}

                    <h2>Watch Video</h2>
                    <p>
                      <a href={strYoutube}>{strYoutube}</a>
                    </p>

                    {/* <div className="link-btn">
                    <p>
                      Login with email & <br /> password
                    </p>
                  </div> */}
                  </div>
                </div>
              );
            }
          )}
        </article>
      </section>
    </>
  );
}

export default AllMeals;
