import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [searchMeal, setSearchMeal] = useState();
  const [searchData, setSearchData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
      .then((response) => response.json())
      .then((data) => setSearchData(data.meals));
  }, [searchMeal]);

  searchMeal === "" ? setSearchMeal(null) : "";

  async function redirect(dishId) {
    await dishId;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate(`/all-meals/${dishId}`, { replace: false });
    });
  }
  return (
    <>
      <div className="SearchComp">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchMeal(e.target.value)}
        />
      </div>
      <div className="Cat">
        <h1>{searchMeal}</h1>
        <div className="CatGrid">
          {searchData
            ? searchData.map(({ strMeal, strMealThumb, idMeal }) => {
                return (
                  <div
                    key={idMeal}
                    className="CatItem"
                    onClick={() => redirect(idMeal)}
                  >
                    <img src={strMealThumb} alt="" />
                    <h1>{strMeal}</h1>
                  </div>
                );
              })
            : ""}
          {/*  {Categories.map(({ strMeal, strMealThumb, idMeal }) => {
              return (
                // <Link className="link" to={`/all-meals/${idMeal}`} key={idMeal}>
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
            })} */}
        </div>
      </div>
    </>
  );
}

export default SearchBox;
